// SurveyForm is where the user adds input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
 render() {
    return (
        <div>
            <form onSubmit={this.props.handleSubmit((values) => { console.log(values); })}
            >
            <Field type="text" name="surveyTitle" component="input" />
            Survey Form!
            <button type="submit">Submit</button>
            </form>
        </div>
    );
 }
}

export default reduxForm({
    form: 'surveyForm' //form is the only important key here
})(SurveyForm);