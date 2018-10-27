const express = require('express');
const mongoose = require('mongoose');

require('./models/User');
const passportConfig = require('./services/passport');
const mongoURI = require('./config/keys').mongoURI;

mongoose.connect(mongoURI);
// require('./services/passport');
// const authRoutes = require('./routes/authRoutes');
const app = express();

passportConfig();

// IIFE
require('./routes/authRoutes')(app);

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT);

