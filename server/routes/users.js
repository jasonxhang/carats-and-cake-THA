const express = require('express');
const router = require('express').Router();
const passport = require('passport');

let User = require('../models/user.model.js');

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

            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    try {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

router.get('/me', async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (e) {
        res.send({message: 'Error in Fetching user'});
        next(e);
    }
});

module.exports = router;
