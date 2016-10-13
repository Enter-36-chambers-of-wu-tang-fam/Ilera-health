// React
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Components
import App from './main/app.js';

// Router
import { Router, browserHistory, hashHistory } from 'react-router';
import routes from './routes';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Middleware
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import ReduxPromise from 'redux-promise';
const logger = createLogger();

// Reducers
import rootReducer from './main/reducers/index.js';

//JWT Authorization Token
// import setAuthorizationToken from '../utils/setAuthorizationToken'

// store
const store = createStore(
    rootReducer,
    applyMiddleware(
        // allows us to dispatch() functions
        // helps with asynchronous actions
        thunkMiddleware,
        logger,
        ReduxPromise
    )
 );

// where our app will be rendered within index.html
let rootElement = document.getElementById('app');

//Axios authorization headers
// if(localStorage.jwtToken){
//   setAuthorizationToken(localStorage.jwtToken);
// }


ReactDOM.render(
  <Provider store={ store }>
     <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={ browserHistory} routes={ routes } />
     </MuiThemeProvider>
  </Provider>
, rootElement);

export default store;
