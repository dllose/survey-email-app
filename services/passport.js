const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = function() {

	const GOOGLE_CLIENT_ID = keys.googleClientID;
	const GOOGLE_CLIENT_SECRET = keys.googleClientSecret;
	const googleStrategy = new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, cb) {
		User.findOne({ googleId: profile.id })
		.then((user) => {
			if (user) {
				console.log("User Exists");
			} else {
				// console.log("Waley");
				new User({ googleId: profile.id }).save();
			}
		});
		// new User({ googleId: profile.id }).save();
	});

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

}
