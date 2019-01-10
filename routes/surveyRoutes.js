const _ = require('lodash');
// const Path = require('path-parser');
// const { URL } = require('url');
const { Path } = require('path-parser');
const url = require('url');

const mongoose = require('mongoose');

const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');

//Can require models/Survey.js instead of this approach
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = function(app) {

	app.get('/api/surveys', requireLogin, async (req, res) => {
        // console.log(req.user);
        const surveys = await Survey.find({ '_user': req.user.id })
        .select({ recipients: false });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.redirect('/api/surveys/thank-you-page');
    });

    app.get('/api/surveys/thank-you-page', (req, res) => {
        res.send('Thank you for the feedback!');
    });

    //webhook route
    app.post('/api/surveys/webhooks', (req, res) => {
        
        // ==============================
        // const p = new Path("/api/surveys/:surveyId/:choice");
        // const events = _.chain(req.body)
        // .map(( { email, url } )=> {
        //     const match = p.test(url.parse(event.url).pathname);
        //     if (match) {
        //         return { email, surveyId: match.surveyId, choice: match.choice };
        //     }
        // })
        // .compact()
        // .uniqBy('email', 'surveyId')
        // .each(() => {
        //  run the query
        // })
        // .value(); 

        // ============================
        const pathParser = new Path("/api/surveys/:surveyId/:choice");
        const events = req.body.map((event) => {
           
            const isUrlFormat = pathParser.test(url.parse(event.url).pathname);
            if (isUrlFormat) {
                console.log("IS URL FORMAT: ")
                console.log(isUrlFormat);
                return { 
                    email: event.email,
                    surveyId: isUrlFormat.surveyId,
                    choice: isUrlFormat.choice
                };
            }
        });
        // const filteredEvents = events.filter(event => event !== undefined);
        // const uniqueEvents = _.uniqBy(filteredEvents, 'email', 'surveyId');
        const uniqueEvents = _.uniqBy(events.filter(event => event !== undefined), 'email', 'surveyId')
        .forEach(({email, surveyId, choice}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { 
                        email: email, 
                        hasResponded: false
                    }
                }
            },
            {
                 $inc: { [choice]: 1 },
                 $set: { 'recipients.$.hasResponded': true },
                 lastResponded: new Date()
            }).exec();
        });

        // const uniqueEvents = _.uniqBy(filteredEvents, 'email', 'surveyId');
        res.send({});
    });

    app.post('/api/survey', require('../middlewares/requireLogin'), requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        console.log(req.body);
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(';').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        
        //trigger send email
        // 1st argument - surveyObject contains information about the email (title, subject, body, reciepients, and sender)
        // 2nd argument - passing a survey.body to the template file
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch(err) {
            res.status(422).send(err); //Unprocessable entity
        }
    });
    
}