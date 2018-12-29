import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = (props) => {
    // console.log(props);
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
        </div>
    );
}

function mapStateToProps({form: { surveyForm: { values }} }) {
    return {
        formValues: values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);