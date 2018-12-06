const stripeSecretkey = require('../config/keys').stripeSecretKey;
const stripe = require('stripe')(stripeSecretkey);
const requireLogin = require('../middlewares/requireLogin');

// const mongoose = require('mongoose');
// const User = mongoose.model('users');
const CREDITS = 5;

module.exports = function(app) {

	// app.post('/api/stripe', (req, res) => {
    //     stripe.charges.create({
    //         amount: 500,
    //         currency: "usd",
    //         source: req.body.id,
    //         description: "Charge test " + req.body.email
    //     },
    //     function(err, charge) {
    //         // asynchronously called
    //         console.log(charge);
    //         res.send("Hi There");
    //     });
    // });
    
    app.post('/api/stripe', requireLogin, async (req, res) => {

        // if (req.user) {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: "usd",
                source: req.body.id,
                description: "Charge test " + req.body.email
            });

            // User.findOneAndUpdate({ googleId: req.user.googleId }, { credits: req.body.amount })
            // .then((data) => {
            //     console.log(data);
            //     res.send('zzzzzzzzzzzzzz');
            // })
            // .catch();
            req.user.credits = req.user.credits + CREDITS;
            const user = await req.user.save();
            res.send(user);
        // }
        
        // res.status(401).send({ error: "User must be logged-in" });
        // User.findOneAndUpdate({ googleId: req.user.googleId }, { credits: req.user.credits })
        // .then((user) => {
        //     console.log(user);
        // });
        // The User Model is in req.user because Passport JS holds it as reference

    });
};