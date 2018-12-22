import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';

import * as actions from '../actions';

const SurveyNew = () => <h2>SurveyNew</h2>

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
