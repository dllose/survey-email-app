// const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// from emailregex.com
const emailRegularExpression = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function(emails) {
    
    const invalidEmails = emails.split(';')
    .map(email => email.trim())
    .filter(invalidEmail => !emailRegularExpression.test(invalidEmail));

    if (invalidEmails.length) {
        return 'These emails are invalid: ' + invalidEmails;
    }

};