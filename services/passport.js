const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

module.exports = function() {

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

}
