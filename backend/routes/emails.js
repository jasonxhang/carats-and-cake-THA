const router = require('express').Router()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let Email = require('../models/email.model.js')

router.post('/new', async (req, res, next) => {
  try {
    const { sender, recipient, subjectLine, emailBody } = req.body
    const newEmail = new Email({
      sender,
      recipient,
      subjectLine,
      emailBody
    })

    const msg = {
      to: recipient,
      from: sender,
      subject: subjectLine,
      text: emailBody
    }

    const sentSgEmail = await sgMail.send(msg)
    const savedEmail = await newEmail.save()

    const postPayload = { sentSgEmail, savedEmail }
    res.json(savedEmail)
  } catch (error) {
    next(error)
  }
})

router.get('/emailHistory', async (req, res, next) => {
  try {
    const allEmails = await Email.find()
    res.json(allEmails)


  } catch (error) {
    next(error)
  }
})


module.exports = router
