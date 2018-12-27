const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function(emails) {
    
    const invalidEmails = emails.split(';')
    .map(email => email.trim())
    .filter(invalidEmail => !emailRegularExpression.test(invalidEmail));

    if (invalidEmails.length) {
        return 'These emails are invalid: ' + invalidEmails;
    }

};