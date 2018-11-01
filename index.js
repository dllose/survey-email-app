const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./models/User');

const passportConfig = require('./services/passport');
console.log(keys);
const mongoURI = keys.mongoURI;
mongoose.connect(mongoURI);
// require('./services/passport');
// const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig();

// IIFE
require('./routes/authRoutes')(app);

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT);

