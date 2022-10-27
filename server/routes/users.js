const express = require('express');
const router = require('express').Router();
const passport = require('passport');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(400).json(info.message);
    }

    if (!user) {
      return res.status(401).json(info.message);
    }

    req.login(user, function (err) {
      if (err) {
        return res.status(401).json('Wrong username and/or password');
      }
      console.log('login -> req.user:', req.user);
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

// router.post(
//   '/register_login',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

router.post('/logout', (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err);
    });
    req.session.destroy();
    console.log('logout -> req.user:', req.user);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    console.log('me -> req.user:', req.user);
    res.json(req.user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
    next(e);
  }
});

module.exports = router;
