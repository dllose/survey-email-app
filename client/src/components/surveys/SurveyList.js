import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SurveyList extends Component {

    componentDidMount() {
        this.props.getSurveys();
    }

    generateSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey darken-1 white-text" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                        <div className="card-action">
                        Yes: <a href="#">{survey.yes}</a>
                        No: <a href="#">{survey.no}</a>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        // let lists = null;
        // if (this.props.surveys) {
        //     lists = this.props.surveys.map(survey => {
        //         // <li>{survey}</li>
        //         // console.log(survey);
        //         // return <li>{survey}</li>;    
        //     });
        // }

        return (
            <div>
                List of Surveys
                {this.generateSurveys()}
            </div>
        );
    }
    
}

const mapStateToProps = function(state) {
    return { surveys: state.surveys };
};

export default connect(mapStateToProps, actions)(SurveyList);
