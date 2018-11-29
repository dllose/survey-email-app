import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        return (
            //  CC Number: 4242 4242 4242 4242
            <StripeCheckout
                name="I want your money"
                description="Load $5 for 5 credits"
                amount={500}
                currency="USD"
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}>
                <button className="btn btn-primary">
                    Pay with Stripe
                </button>
            </StripeCheckout>
        );
    }
    tokenFromStripe(token) {
        return token;
    }
}

export default Payments;