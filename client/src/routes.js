// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

// Components
import App from './components/app.js';
import Signin from './components/auth/signin-component.js';
import Signup from './components/auth/signup-component.js';
import PatientApp from './components/patient-app/patient-app.jsx';
import ProviderApp from './components/physician-app/physician-app.jsx';
import UpdatePatient from './components/patient-app/updatePatient.js';
import UpdatePhysician from './components/physician-app/updatePhysician.js';

import EmergencyContactForm from './containers/forms/emergency-contact-form.js';
import InsuranceForm from './containers/forms/insurance-policy-form.js';
import BackgroundForm from './containers/forms/demographic-form.js';
import FormParent from './components/form-parent.js';

export default (
    <Router path='/' component= { App } >
        <IndexRoute component={ Signup }/>
        <Route path='signup' component={ Signup } />
        <Route path='signin' component={ Signin } />
        
        <Route path='provider' component={ ProviderApp } >
            <Route path="dashboard" component={ PhysicianDashboard } />  (component) (appointment --> container)
            <Route path="patients" component={ AllUsers } >
              <Route path=':first:last' component={ Profile } />
            </Route>
            <Route path="notes" component={ Notes } />
            <Route path="messages" component={ Messages } />
            <Route path="profile" component={ Profile } />
            <Route path="calendar" component ={ Calendar }/>  
        </Route>
        
        <Route path='patient' component={ PatientApp } >
            <Route path="form" > 
                <IndexRoute component={ BackgroundForm } />
                <Route path='background' component={ BackgroundForm } />
                <Route path='emergencyContact' component={ EmergencyContactForm } />
                <Route path='insurance' component={ InsuranceForm } />
            </Route>
            <Route path="dashboard" component={ PatientDashboard } />
            <Route path="healthlog" component={ HealthLog } />
            <Route path="physicians" component={ AllUsers } >
              <Route path=':first:last' component={ Profile } />
            </Route>
            <Route path="messages" component={ Messages } />
            <Route path="profile" component={ Profile } />
            <Route path="medications" component ={ Medications }/>                  
        </Route>




    </Router>
);
