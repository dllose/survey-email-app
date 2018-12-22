const mongoose = require('mongoose');

const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');

//Can require models/Survey.js instead of this approach
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = function(app) {

	app.get('/api/surveys', (req, res) => {

	});

    app.get('/api/surveys/thank-you-page', (req, res) => {
        res.send('Thank you for the feedback!');
    });

    app.post('/api/survey', require('../middlewares/requireLogin'), requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        console.log(req.body);
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
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