import axios from 'axios';
import { GET_USER, GET_SURVEYS } from './types';

export const getUser = () => async dispatch => { 
    const response = await axios.get('/api/current_user');
    dispatch({ type: GET_USER, payload: response.data });
};

export const handleToken = (token) => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    console.log(response);

    dispatch({ type: GET_USER, payload: response.data });
};

export const getSurveys = () => async dispatch => {
    const response = await axios.get('/api/surveys');
    dispatch({ type: GET_SURVEYS, payload: response.data });
}

export const sendSurveys = (values, history) => async (dispatch) => {
    // return dispatch(() => {
        // return
        // console.log(values);
        console.log(history);
    const response = await axios.post('/api/survey', values) 
    dispatch({ type: GET_USER, payload: response.data });
    // })
    // return { type: 'send_servey' };
    history.push("/surveys");
};

export const clearSurveyFormValues = (values) => {
    console.log(values);
    return {
        type: 'clear_form_values'
    }
};

// export const getUser = () => async dispatch => 
//     dispatch({ type: GET_USER, payload: await axios.get('/api/current_user') });

// export const getUser = function() {
    // return function(dispatch) {
    //     axios.get('/api/current_user')
    //     .then(response => {
    //         console.log(response);
    //         dispatch({ type: GET_USER, payload: response });
    //     });
    // }
    // return {
    //     type: GET_USER,
    //     payload: request
    // }
// }


//  default getUser;