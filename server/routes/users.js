const express = require('express');
const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = require('../middleware/auth.js');

let User = require('../models/user.model.js');

// router.post('/signup', async (req, res, next) => {
//     try {
//         console.log('req.user', req.user);
//         const {signUpName, email, password} = req.body;

//         let user = await User.findOne({
//             email,
//         });
//         if (user) {
//             return res.status(400).send('User Already Exists');
//         }

//         user = new User({
//             signUpName,
//             email,
//             password,
//         });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };

//         jwt.sign(payload, 'randomString', {expiresIn: 10000}, (err, token) => {
//             if (err) throw err;
//             req.login(user, (err) =>
//                 err
//                     ? next(err)
//                     : res.status(200).json({
//                           token,
//                           user,
//                       })
//             );
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error in Saving');
//         next(error);
//     }
// });

// router.post('/login', async (req, res, next) => {
//     console.log('req.user', req.user);
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array(),
//         });
//     }

//     const {email, password} = req.body;
//     try {
//         let user = await User.findOne({
//             email,
//         });
//         if (!user) return res.status(400).send('User Not Exist');

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).send('Incorrect Password !');

//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };

//         jwt.sign(payload, 'secret', {expiresIn: 3600}, (err, token) => {
//             if (err) throw err;
//             req.login(user, (err) =>
//                 err
//                     ? next(err)
//                     : res.status(200).json({
//                           token,
//                           user,
//                       })
//             );
//         });
//     } catch (error) {
//         next(error);
//     }
// });

router.post('/register_login', (req, res, next) => {
    // console.log('hit this route');
    // console.log('req.body', req.body);
    passport.authenticate('local', function (err, user, info) {
        // console.log('116', req.body);
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
        console.log('req.user', req.user);
        res.json(req.user);
    } catch (e) {
        res.send({message: 'Error in Fetching user'});
        next(e);
    }
});

module.exports = router;
