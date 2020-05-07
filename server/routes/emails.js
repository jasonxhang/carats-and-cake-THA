const router = require('express').Router();

const sgMail = require('@sendgrid/mail');

const {
    classes: {Mail},
} = require('@sendgrid/helpers');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// console.log('process.env', process.env);
// console.log('process.env.SENDGRID_API_KEY2:', process.env.SENDGRID_API_KEY2);

let Email = require('../models/email.model.js');
let User = require('../models/user.model.js');

router.post('/new', async (req, res, next) => {
    try {
        const {recipient, subjectLine, emailBody} = req.body;
        const sender = req.user.email;
        const newEmail = new Email({
            sender,
            recipient,
            subjectLine,
            emailBody,
        });

        const msg = {
            to: recipient,
            from: sender,
            subject: subjectLine,
            text: emailBody,
        };

        const mail = Mail.create(msg);
        const body = mail.toJSON();
        console.log('body', body);

        console.log('msg:', msg);
        const sentSgEmail = await sgMail.send(msg);
        console.log('sentSgEmail:', sentSgEmail);
        const savedEmail = await newEmail.save();

        await User.updateOne({_id: req.user._id}, {$inc: {emailsSent: 1}});

        res.json({sentSgEmail, savedEmail});
    } catch (error) {
        console.log('Sendgrid error:', error.response.body.errors);
        next(error);
    }
});

router.get('/emailHistory', async (req, res, next) => {
    try {
        // console.log('req.user', req.user);
        console.log('req.sessionID', req.sessionID);
        const allEmails = await Email.find({sender: req.user.email});
        // const allEmails = await Email.find();
        res.json(allEmails);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
