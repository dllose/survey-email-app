const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	console.log(user);
	//shortcut for user._id.$oid
	console.log(user.id);
	done(null, user.id)
});

passport.deserializeUser((id, done) => {
	//everytime there's an action to the data. It is a asynchronous. It returns a Promise, so it should be chained by .then()
	User.findById(id)
	.then(user => {
		done(null, user);
	})
});

module.exports = function() {

	const GOOGLE_CLIENT_ID = keys.googleClientID;
	const GOOGLE_CLIENT_SECRET = keys.googleClientSecret;
	const googleStrategy = new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback', //relative path makes think Google think you are using http,
		proxy: true
	},
	async function(accessToken, refreshToken, profile, done) {

		const user = await User.findOne({ googleId: profile.id });

		if (user) {
			console.log("User Exists");
			return done(null, user);
		}
		const user = await new User({ 
			googleId: profile.id,
			firstname: profile.name.givenName,
			lastname: profile.name.familyName,
			email: profile.emails[0].value
			})
		.save()
		done(null, user);

	});
	// function(accessToken, refreshToken, profile, done) {

	// 	User.findOne({ googleId: profile.id })
	// 	.then((user) => {
	// 		if (user) {
	// 			console.log("User Exists");
	// 			done(null, user);
	// 		} else {
	// 			new User({ 
	// 				googleId: profile.id,
	// 				firstname: profile.name.givenName,
	// 				lastname: profile.name.familyName,
	// 				email: profile.emails[0].value
	// 			 })
	// 			.save()
	// 			.then((user => { 
	// 				return done(null, user)
	// 			}));
	// 		}
	// 	});

	// });

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
