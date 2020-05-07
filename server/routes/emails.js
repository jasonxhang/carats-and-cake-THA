const router = require('express').Router();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

        const sentSgEmail = await sgMail.send(msg);
        const savedEmail = await newEmail.save();

        await User.updateOne({_id: req.user._id}, {$inc: {emailsSent: 1}});

        res.json({sentSgEmail, savedEmail});
    } catch (error) {
        next(error);
    }
});

router.get('/emailHistory', async (req, res, next) => {
    try {
        const allEmails = await Email.find({sender: req.user.email});
        res.json(allEmails);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
