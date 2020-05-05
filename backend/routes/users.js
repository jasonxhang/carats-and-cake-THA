const express = require('express')
const router = require('express').Router()
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth.js')

let User = require('../models/user.model.js')


router.post('/signup', async (req, res, next) => {
  try {

    const { signUpName, email, password } = req.body

    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    }

    user = new User({
      signUpName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);

    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token
      });
    }
    );


  } catch (error) {
    res.status(500).send("Error in Saving");
    next(error)
  }
})

router.post('/login', async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token,
        user
      });
    }
    );


  } catch (error) {
    next(error)
  }
})


router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', auth, async (req, res) => {
  console.log('req user id!', req.user.id)
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


module.exports = router
