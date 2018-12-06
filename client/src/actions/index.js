import axios from 'axios';
import { GET_USER } from './types';

export const getUser = () => async dispatch => { 
    const response = await axios.get('/api/current_user');
    dispatch({ type: GET_USER, payload: response.data });
}

export const handleToken = (token) => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    console.log(response);

    dispatch({ type: GET_USER, payload: response.data });
}

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