import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import defaultState from './redux/defaultState';

let store = configureStore(defaultState);

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
    ), document.getElementById('root'));

//store.dispatch(getTeams());
registerServiceWorker();
