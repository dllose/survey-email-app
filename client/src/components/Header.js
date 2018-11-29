import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default: 
                return (
                    [
                    <li key="1"><Payments /></li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                    ]
                );
        }
    }

    render() {

        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-1">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="brand-logo"
                    >Email Survey</Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// destructure style 
function mapStateToProps({ auth }) {
    // (state) {
    //      return  { auth: state.auth}
    // }
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);