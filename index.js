const express = require('express');
const passportConfig = require('./services/passport');
// require('./services/passport');
// const authRoutes = require('./routes/authRoutes');
const app = express();

passportConfig();

// IIFE
require('./routes/authRoutes')(app);

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT);

