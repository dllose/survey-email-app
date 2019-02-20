import React from 'react';

const About = () => {

    return (
        <div>
            <div>
                <p>This is a MERN application (MongoDB, Express, React and Node JS)</p>
                <p>Users would sign-up using their Google Account via OAuth, no need to sign-up on the site</p>
                <p>You can load credits using a test credit card after signing-in just use the credit card number "4242 4242 4242 4242"</p>
                <p>This is still under development</p>
                <ul class="collection with-header">
                    <li className="collection-header">
                        <h5>People involved with this app:</h5>
                    </li>
                    <li className="collection-item avatar">
                        <img src="https://graph.facebook.com/v3.2/100005992510014/picture?type=large" alt="" className="circle" />
                        <span className="title">Software Developer</span>
                        <p>Duane A. Llose</p>
                    </li>
                    <li className="collection-item avatar">
                        <img src="https://graph.facebook.com/v3.2/100000075774214/picture?type=large" alt="" className="circle" />
                        <span className="title">Software Quality Assurance</span>
                        <p>Karla S. Mangosong</p>
                    </li>
                </ul>
            </div>        
        </div>
    );

}

export default About;