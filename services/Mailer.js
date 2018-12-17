const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const apiKey = require('../config/keys').sendGridKey;

// var Mailer = function() {

// }

// var Mailer = new Object();
// Mailer.prototype.method_name = helper.Mail;


class Mailer extends helper.Mail {

}

module exports = Mailer;