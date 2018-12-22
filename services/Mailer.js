// const sgMail = require('@sendgrid/mail');
// const apiKey = require('../config/keys').sendGridKey;

// var Mailer = function() {

// }

// var Mailer = new Object();
// Mailer.prototype.method_name = helper.Mail;


// https://www.npmjs.com/package/@sendgrid/mail
// https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md

const sgMail = require('@sendgrid/mail');
const apiKey = require('../config/keys').sendGridKey;
 
class Mailer {
  constructor({subject, recipients}, content){
    this.message = { 
      to: recipients,
      from: 'no-reply@mysterious-earth-13931.herokuapp.com',
      subject,
      html: content,
      trackingSettings: {
        clickTracking: { enable: true }
      }
    };
    sgMail.setApiKey(apiKey);
  }
 
  async send() {
    const response = await sgMail.sendMultiple(this.message);
    return response;
  }
}

module.exports = Mailer;