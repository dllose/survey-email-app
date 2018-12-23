import { combineReducers } from 'redux';
import authReducer from './authReducer';

import { reducer as formReducer } from 'redux-form';

const reducers = {
    auth: authReducer,
    form: formReducer
};

export default combineReducers(reducers);