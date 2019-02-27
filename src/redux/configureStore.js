import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';

export default function configureStore(initialState) {
    
    let enhancements = [applyMiddleware(thunk)];

    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancements.push(window.__REDUX_DEVTOOLS_EXTENSION__());  
    }

    return createStore(reducer, initialState, compose(...enhancements));
}
