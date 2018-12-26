import React, { Component } from 'react';

class SurveyField extends Component {
    
    render() {
        // console.log(this.props.input);
        const { input, label, meta: { error, touched} } = this.props;
        return (
            <div>
                <label>{label}</label>
                <input {...input} style={{ "marginBottom": "5px"}} />
                <div className="red-text" style={{ marginBottom: '20px' }}>
                  { touched && error }
                  {/* { touched && error ? error :  '' } */}
                </div>
            </div>
        );
    }

}

export default SurveyField;