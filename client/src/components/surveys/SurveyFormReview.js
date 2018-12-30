import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router';

const SurveyFormReview = (props) => {
    // console.log(props);
    // console.log(sendSurveys);
    const reviewFields = formFields.map(({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{props.formValues[name]}</div>
            </div>
        );
    })
    // var values = Object.keys(props.formValues).map((value => <li key={value}>{props.formValues[value]}</li>));
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {/* <div>
                <ul>
                    {values}
                </ul>
            </div> */}
            <div>
                {reviewFields}
            </div>
            <button
             className="red white-text darker-3 btn-flat"
             onClick={props.onCancel}>
                Back
            </button>
            <button
                onClick={() => props.sendSurveys(props.formValues, props.history)}
                className="teal white-text btn-flat right">
                Submit
                <i className="material-icons right">email</i>
            </button>

        </div>
    );
}

function mapStateToProps({form: { surveyForm: { values }} }) {
    return {
        formValues: values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));