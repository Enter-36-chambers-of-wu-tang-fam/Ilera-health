// React
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

// Components
import App from './components/app.js';

// Router
import { Router, browserHistory, hashHistory } from 'react-router';
import routes from './routes';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Middleware
import thunkMiddleware from 'redux-thunk';

// Reducers
import rootReducer from './reducers/index.js';

// store
const store = createStore( 
    rootReducer,
    applyMiddleware(
        // allows us to dispatch() functions
        // helps with asynchronous actions
        thunkMiddleware
    )
 );

// where our app will be rendered within index.html
let rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory} routes={ routes } />
  </Provider>
  , rootElement);