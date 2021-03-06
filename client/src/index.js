// CSS Import
import 'materialize-css/dist/css/materialize.min.css';

//JS Import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

// For Testing only. Will be removed before deploying to Heroku
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>    
    </Provider>,
     document.getElementById("root")
);
