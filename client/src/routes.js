// React 
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

// Components 
import App from './components/app.js';
import Signin from './components/auth/signin_component.js';
import PatientApp from './components/patient-app/patient-app.jsx';
import ProviderApp from './components/physician-app/physician-app.jsx';

export default (
    <Router path='/' component= { App } >
        <Route path='provider' component={ ProviderApp } >
            <Route path='signin' component={ Signin} />
        </Route>
        <Route path='patient' component={ PatientApp } >
            <Route path='signin' component={ Signin} />
        </Route>
    </Router>
);

