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

	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			console.log('Argument inside');
			res.redirect('/surveys');

		});

	app.get('/api/logout', (req, res) => {
		req.session = null;
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		// console.log(req.user);
		res.send(req.user);
	});

	// app.post('/api/stripe', (req, res) => {
	// 	console.log(req.body);
	// 	res.send("NAMO!!!");
	// });

	app.get('/test', function(req, res) {
		res.setHeader('Set-Cookie', ['ninja=naruto;HttpOnly;SameSite=Strict']);
		res.send('Hiiiiiiiiiiiii!');
	});

};

