// SurveyForm is where the user adds input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

// const FIELDS = [
//     {
//         label: 'Survey Title',
//         name: 'title',
//         errorMessage: 'Title is required'
//     },
//     {
//         label: 'Subject Line',
//         name: 'subject',
//         errorMessage: 'Subject is required'
//     },
//     {
//         label: 'Email Body',
//         name: 'body',
//         errorMessage: 'Message is required'

//     },
//     {
//         label: 'Recipients',
//         name: 'emails',
//         errorMessage: 'E-mail Address is required'
//     },
// ];

class SurveyForm extends Component {

    renderFields() {
        return formFields.map(({ label, name }) => {
            return <Field 
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
            />
        });
        // return _.map(FIELDS, ({ label, name }) => {
        //     return <Field 
        //         key={name} 
        //         component={SurveyField} 
        //         type="text" 
        //         label={label} 
        //         name={name} 
        //         />
        // })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <button 
                        className="teal btn-flat right white-text" 
                        type="submit">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                    <Link 
                        to="/surveys" 
                        className="red btn-flat white-text left"> 
                        Cancel                
                    </Link>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    validate: (
        values
        // { title, subject, body, emails }
        ) => {
        const errors = {};
        
        errors.emails = validateEmails(values.emails || '');

        formFields.forEach(({ name, errorMessage }) => { //name property of the FIELDS array
            if (!values[name]) {
                // errors[name] = name[0].toUpperCase() + name.slice(1) + ' is required';
                errors[name] = errorMessage;
            }

        });

        // if (!title) {
        //     errors.title = 'Title is required';
        //     console.log(errors);
        // }

        // if (!subject) {
        //     errors.subject = 'Subject is required';
        // }

        // if (!body) {
        //     errors.body = 'Body is needed';
        // }

        return errors;
    },
    form: 'surveyForm', //form is the only important key here
    destroyOnUnmount: false //True by default. True would destroy the values. False won't clear the text fields
})(SurveyForm);