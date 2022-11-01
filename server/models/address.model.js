const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const addressSchema = new Schema({
  fullName: { type: 'String', required: true },
  emailAddress: { type: 'String', required: true },
  phoneNumber: { type: 'String', required: true },
  streetAddress: { type: 'String', required: true },
  city: { type: 'String', required: true },
  state: { type: 'String', required: true },
  postalCode: { type: 'String', required: true },
  user: { type: ObjectId, required: true, ref: 'User' },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
