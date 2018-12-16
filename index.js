const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');

const passportConfig = require('./services/passport');
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

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {

//     next();
// });

passportConfig();

// IIFE
require('./routes/authRoutes')(app);
require('./routes/stripeRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express runs assets for production (main.js, main.css)
    app.use(express.static('client/build'));
    // if the backend doesn't recognize the route, send back index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT);

