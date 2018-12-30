// SurveyNew shows the SurveyForm Component and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import * as actions from '../../actions';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { showFormReview: false };
    // }
    
    state = {
        showFormReview: false
    };

    // componentWillUnmount() {
    //     // console.log(this.props.form.surveyForm.values);
    //     // this.formValues;
    //     actions.clearSurveyFormValues(this.props.form.surveyForm.values);
        
    // }

    renderContent() {
      return (
          this.state.showFormReview ? 
          <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} /> : 
          <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}  />);
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }

}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);


// function mapStateToProps(state) {
//     return state;
// };

// export default connect(mapStateToProps)(SurveyNew);