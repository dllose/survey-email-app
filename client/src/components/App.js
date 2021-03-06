import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import About from './About';
import SurveyNew from './surveys/SurveyNew';

import * as actions from '../actions';

class App extends Component {

    componentDidMount() {
        this.props.getUser();
        // console.log(this.props);
    }

   render() {
    return (
        <div className="container">  
            <BrowserRouter>
                <div>
                    <Header />
                    <Route 
                        path="/" 
                        exact 
                        component={Landing} />
                    <Route 
                        path="/about-us"
                        component={About} />     
                    <Route 
                        path="/surveys"
                        exact 
                        component={Dashboard} />
                    <Route 
                        path="/surveys/new"
                        component={SurveyNew} />                     
                </div>
            </BrowserRouter>
        </div>
    );
   } 
}

export default connect(null, actions)(App);
