const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: 'String',
    required: 'true',
    unique: true,
  },
  signUpName: {
    type: 'String',
    required: 'true',
    trim: true,
  },
  password: {
    type: 'String',
    required: true,
  },
  createdAt: {
    type: 'Date',
    default: Date.now,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
