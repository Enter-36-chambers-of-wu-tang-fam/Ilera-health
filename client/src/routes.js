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
import UpdatePatient from './components/patient-app/updatePatient.js';
import UpdatePhysician from './components/physician-app/updatePhysician.js';

import EmergencyContactForm from './containers/forms/emergency-contact-form.js';
import InsuranceForm from './containers/forms/insurance-policy-form.js';

export default (
    <Router path='/' component= { App } >
        <Route path='provider' component={ ProviderApp } >
            <Route path='signin' component={ Signin} />
        </Route>
        <Route path='patient' component={ PatientApp } >
            <Route path='signin' component={ Signin} />
            <Route path='updatePatient' component={ UpdatePatient } />
            <Route path='updatePhysician' component={ UpdatePhysician } />
        </Route>
    </Router>
);
