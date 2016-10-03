// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

//Authentication Requirement
import PhysicianAuth from './components/auth/physician_auth.js';
import PatientAuth from './components/auth/patient_auth.js';
import GeneralAuth from './components/auth/general_auth.js';

//Shared Components
import App from './components/app.js';
import Welcome from './components/shared/welcome.jsx';
import Signin from './components/auth/signin-component.js';
import Signup from './components/auth/signup-component.js';
import AllUsers from './components/shared/allUsers.jsx';
import Profile from './components/patient-app/profile/patient-profile.jsx';
import Chat from './containers/chat-container.js';

// Physician Components
import PhysicianApp from './components/physician-app/physician-app.jsx';
import PhysicianDashboard from './components/physician-app/physician-dashboard.jsx';
import Notes from './components/physician-app/notes.jsx';
import Calendar from './components/physician-app/calendar.jsx';

// Patient Components
import PatientApp from './components/patient-app/patient-app.jsx';
import PatientDashboard from './components/patient-app/patient-dashboard.jsx';
import HealthLog from './components/patient-app/health-log.jsx';
import Medications from './components/patient-app/medication-dash/medication-class.jsx';
import PhysicianCalendar from './components/patient-app/physician-profile-calendar.jsx';
import PatientAppFormContainer from './components/patient-app/patient-signup-forms.jsx';
import PhysicianList from './components/patient-app/all-physicians.jsx';

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
