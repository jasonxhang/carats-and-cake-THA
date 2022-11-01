const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseEncrypt = require('mongoose-encryption');

const { ObjectId } = Schema.Types;
const MONGOOSE_ENC_KEY =
  process.env.MONGOOSE_ENC_KEY || 'VIc2zK8t9QtuxOU/mvw68KEDwvwMyE7prtqM2dTqTvA=';
const MONGOOSE_SIG_KEY =
  process.env.MONGOOSE_SIG_KEY ||
  '46cvJGAZfFIvQDcwZIF9pTMO+s7VYVa+SnvbFwabSqM73hZViqLtami5DxZAcZTLPEJ0UDWHfAJ9eYxyg3crxw==';

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

addressSchema.plugin(mongooseEncrypt, {
  encryptionKey: MONGOOSE_ENC_KEY,
  signingKey: MONGOOSE_SIG_KEY,
  excludeFromEncryption: ['user'],
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
