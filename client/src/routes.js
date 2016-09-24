// React 
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

// Components 
import App from './components/app.js';
import Signin from './components/auth/signin-component.js';
import PatientApp from './components/patient-app/patient-app.jsx';
import ProviderApp from './components/physician-app/physician-app.jsx';
import EmergencyContactForm from './containers/forms/emergency-contact-form.js';
import InsuranceForm from './containers/forms/insurance-policy-form.js';
import BackgroundForm from './containers/forms/demographic-form.js';
import FormParent from './components/form-parent.js';

export default (
    <Router path='/' component= { App } >
        <IndexRoute component={ Signin }/>
        <Route path='signin' component={ Signin } />
        <Route path='provider' component={ ProviderApp } >
        </Route>
        <Route path='patient' component={ PatientApp } >
            <Route path="form" > 
                <IndexRoute component={ BackgroundForm }/>
                <Route path='background' component={ BackgroundForm } />
                <Route path='emergencyContact' component={ EmergencyContactForm } />
                <Route path='insurance' component={ InsuranceForm } />
            </Route>
        </Route>
    </Router>
);

