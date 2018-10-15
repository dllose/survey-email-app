const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

const googleStrategy = new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: ''
});

passport.use(
	googleStrategy,
	function(accessToken, refreshToken, profile, cb) {
		User.findOrCreate({ googleId: profile.id }, function(err, user) {
			return cb(err, user);
		});
	}
);

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send({'hi': 'there'});
});

app.listen(PORT);