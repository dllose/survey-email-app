const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const GOOGLE_CLIENT_ID = keys.googleClientID;
const GOOGLE_CLIENT_SECRET = keys.googleClientSecret;

const googleStrategy = new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, cb) {
		console.log('access token:', accessToken);
		console.log('refresh token:', refreshToken);
		console.log('profile:', profile);
	},
);

passport.use(
	googleStrategy,
);

// passport.use(
// 	new GoogleStrategy({
// 		clientID: GOOGLE_CLIENT_ID,
// 		clientSecret: GOOGLE_CLIENT_SECRET,
// 		callbackURL: '/auth/google/callback'
// 	},
// 	function(accessToken, refreshToken, profile, cb) {
// 		// User.findOrCreate({ googleId: profile.id }, function(err, user) {
// 		// 	return cb(err, user);
// 		// });
// 		// console.log(cb);
// 		console.log(accessToken);
// 	}
// ));

//If the ENV variable PORT isn't defined, use 8080
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send({'hi': 'there'});
});

app.get(
	'/auth/google', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

// app.get(
// 	'/auth/google', 
// 	function(req, res) {
// 		console.log(req, res);
// 	});

// app.get('/auth/google/callback', function(req, res) {
// 	console.log(req);
// 	console.log(res);
// });




app.listen(PORT);

