const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('./passport');
const MongoStore = require('connect-mongo')(session);

const User = require('./models/user.model.js');

require('dotenv').config();

const app = express();
module.exports = app;

const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'));

    // // cors middleware
    // app.use(cors());

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // compression middleware
    app.use(compression());

    mongoose
        .connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        .catch((error) => console.error(error));

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('MongoDB database connection established successfully...');
    });

    // app.use(cookieParser(process.env.SESSION_SECRET || 'shh very secret'));
    // session middleware with passport
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'shh very secret',
            store: new MongoStore({mongooseConnection: connection}),
            resave: false,
            saveUninitialized: true,
            // cookie: {secure: false},
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', '/public')));

    app.use('/api/email', require('./routes/emails'));
    app.use('/api/user', require('./routes/users'));

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });

    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'));
    });

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
};

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

async function bootApp() {
    await createApp();
    await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
    bootApp();
} else {
    createApp();
}
