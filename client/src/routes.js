// React 
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

// Components 
import App from './components/app.js';
import Signin from './components/auth/signin_component.js';

export default (
    <Router path='/' component= { App } >
        <Route path='signin' component={ Signin } />
    </Router>
)

