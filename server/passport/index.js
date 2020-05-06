const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// passport registration
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Local Strategy
passport.use(
    new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true},
        (req, email, password, done) => {
            // Match User
            const {signUpName, method} = req.body;
            User.findOne({email: email})
                .then((user) => {
                    if (user && method === 'signup') {
                        return done(null, false, {message: 'User already exists.'});
                    }
                    // Create new User
                    if (!user && signUpName) {
                        const newUser = new User({email, password, signUpName});
                        // Hash password before saving in database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then((user) => {
                                        return done(null, user);
                                    })
                                    .catch((err) => {
                                        return done(null, false, {message: err});
                                    });
                            });
                        });
                        // Return other user
                    } else {
                        // Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done('Password incorrect', false, {
                                    message: 'Wrong password',
                                });
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log('58', err);
                    return done(null, false, {errors: err});
                });
        }
    )
);

module.exports = passport;
