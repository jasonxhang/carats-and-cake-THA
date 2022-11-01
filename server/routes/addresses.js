const router = require('express').Router();
const Address = require('../models/address.model.js');

const formatPhoneNumber = (unformatted) => {
  let phoneNumber = unformatted.replace(/[^+\d]+/g, '');
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+1${phoneNumber}`;
  }
  return phoneNumber;
};

router.post('/new', async (req, res, next) => {
  try {
    const { fullName, emailAddress, phoneNumber, streetAddress, city, state, postalCode } =
      req.body.values;
    const user = req.user;

    const newAddress = await Address.create({
      fullName,
      emailAddress,
      phoneNumber: formatPhoneNumber(phoneNumber),
      streetAddress,
      city,
      state,
      postalCode,
      user,
    });

    res.json({ newAddress });
  } catch (error) {
    next(error);
  }
});

router.get('/all-addresses', async (req, res, next) => {
  try {
    if (req.user) {
      const allAddresses = await Address.find({ user: req.user });
      res.json(allAddresses);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
