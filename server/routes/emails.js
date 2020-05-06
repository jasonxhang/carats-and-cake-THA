const router = require('express').Router();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let Email = require('../models/email.model.js');

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

        const sentSgEmail = await sgMail.send(msg);
        const savedEmail = await newEmail.save();

        res.json(savedEmail);
    } catch (error) {
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
