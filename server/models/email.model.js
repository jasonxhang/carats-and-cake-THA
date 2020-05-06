const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  sender: { type: 'String', required: true },
  recipient: { type: 'String', required: true },
  subjectLine: { type: 'String', required: true },
  emailBody: { type: 'String', required: true },
  timeSent: { type: 'Date', default: Date.now, required: true },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email
