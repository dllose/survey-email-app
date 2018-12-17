const mongoose = require('mongoose');

const requireCredits = require('../middlewares/requireCredits');
// const requireLogin = require('../middlewares/requireLogin');

//Can require models/Survey.js instead of this approach
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = function(app) {

	app.get('/api/surveys', (req, res) => {

	});

    app.post('/api/survey', require('../middlewares/requireLogin'), requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        
        //trigger send email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        // survey.save();

    });
    
}