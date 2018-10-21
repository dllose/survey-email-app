const passport = require('passport');
 
module.exports = function(app) {

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


};

