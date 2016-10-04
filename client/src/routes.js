// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

//Authentication Requirement
import PhysicianAuth from './auth-shared/higher-order-components/physician_auth.js';

import PatientAuth from './auth-shared/higher-order-components/patient_auth.js';

import GeneralAuth from './auth-shared/higher-order-components/general_auth.js';

//Shared Components
import App from './main/app.js';
import Welcome from './auth-shared/components/welcome.jsx';
// ./components/shared/welcome.jsx
import Signin from './auth-shared/components/signin-component.js';
// ./components/auth/signin-component.js
import Signup from './auth-shared/components/signup-component.js';
// ./components/auth/signup-component.js
import AllUsers from './patients/components/physicians-dash/allUsers.jsx';
// ./components/shared/allUsers.jsx
import Profile from './patients/components/profile-dash/patient-profile.jsx';
// ./components/patient-app/profile/patient-profile.jsx
import Chat from './patients/containers/messages/chat-container.js';
// ./containers/chat-container.js

// Physician Components
import PhysicianApp from './physicians/physician-app/physician-app.jsx';
// ./components/physician-app/physician-app.jsx
import PhysicianDashboard from './physicians/physician-app/physician-dashboard.jsx';
// ./components/physician-app/physician-dashboard.jsx
import Notes from './physicians/physician-app/notes.jsx';
// ./components/physician-app/notes.jsx
import Calendar from './physicians/physician-app/calendar.jsx';
// ./components/physician-app/calendar.jsx

// Patient Components
import PatientApp from './patients/components/patient-app.jsx';
// ./components/patient-app/patient-app.jsx
import PatientDashboard from './patients/components/main-dash/patient-dashboard.jsx';
// ./components/patient-app/patient-dashboard.jsx
import HealthLog from './patients/components/health-log-dash/health-log.jsx';
// ./components/patient-app/health-log.jsx
import Medications from './patients/components/medication-dash/medication-class.jsx';
// ./components/patient-app/medication-dash/medication-class.jsx
import PhysicianCalendar from './patients/components/physicians-dash/physician-profile-calendar.jsx';
// ./components/patient-app/physician-profile-calendar.jsx
import PatientAppFormContainer from './patients/components/onboarding/patient-signup-forms.jsx';
// ./components/patient-app/patient-signup-forms.jsx
import PhysicianList from './patients/components/physicians-dash/all-physicians.jsx';
// ./components/patient-app/all-physicians.jsx

export default (
    <Router path='/' component= { App } >
        <IndexRoute component={ GeneralAuth(Welcome) }/>
        <Route path='signup' component={ GeneralAuth(Signup) } />
        <Route path='signin' component={ GeneralAuth(Signin) } />
        <Route path='provider' component={ PhysicianAuth(PhysicianApp) } >
            <Route path="dashboard" component={ PhysicianDashboard } />
            <Route path="patients" component={ AllUsers } >
              <Route path=':patientId' component={ Profile } />
            </Route>
            <Route path="notes" component={ Notes } />
            <Route path="messages" component={ Chat } />
            <Route path="profile" component={ Profile } />
            <Route path="calendar" component ={ Calendar }/>
        </Route>
        <Route path='patient' component={ PatientAuth(PatientApp) } >
            <Route path="form" >
                <IndexRoute component={ PatientAppFormContainer } />
            </Route>
            <Route path="dashboard" component={ PatientDashboard } />
            <Route path="healthlog" component={ HealthLog } />
            <Route path="physicians" component={ AllUsers } />
              <Route path='physicians/:provider' component={ Profile } >
                <Route path='calendar' component={ PhysicianCalendar } />
              </Route>
            <Route path="messages" component={ Chat } />
            <Route path="profile" component={ Profile } />
            <Route path="medications" component ={ Medications } />
        </Route>
    </Router>
);
