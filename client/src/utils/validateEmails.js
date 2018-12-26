export default function(emails) {
    return emails.split(';').map(email => email.trim());
};