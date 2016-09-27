// React
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
import createLogger from 'redux-logger';
const logger = createLogger();

// Reducers
import rootReducer from './reducers/index.js';

// store
const store = createStore( 
    rootReducer,
    applyMiddleware(
        // allows us to dispatch() functions
        // helps with asynchronous actions
        thunkMiddleware,
        logger
    )
 );

// where our app will be rendered within index.html
let rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={ store }>
     <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={ browserHistory} routes={ routes } />
     </MuiThemeProvider>
  </Provider>
  , rootElement);

  export default store;