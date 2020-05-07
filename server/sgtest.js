// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey('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');

const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
