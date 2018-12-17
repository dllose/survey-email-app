const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const apiKey = require('../config/keys').sendGridKey;

// var Mailer = function() {

// }

// var Mailer = new Object();
// Mailer.prototype.method_name = helper.Mail;


class Mailer extends helper.Mail {

	constructor({ subject, recipients }, content) {
		super();
	}

	// constructor(surveyObject, template) {
	// 	this.surveyObject = surveyObject;
	// 	this.template = template;
	// }

}

module exports = Mailer;