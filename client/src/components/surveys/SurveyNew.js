// SurveyNew shows the SurveyForm Component and SurveyFormReview

import React, { Component } from 'react';
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

    renderContent() {
      return (
          this.state.showFormReview ? 
          <SurveyFormReview /> : 
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

export default SurveyNew;