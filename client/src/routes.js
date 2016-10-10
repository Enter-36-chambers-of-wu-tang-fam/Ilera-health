// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

//Authentication Requirement
import PhysicianAuth from './auth-shared/higher-order-components/physician_auth.js';

import PatientAuth from './auth-shared/higher-order-components/patient_auth.js';

import StaffAuth from './auth-shared/higher-order-components/staff_auth.js';

import GeneralAuth from './auth-shared/higher-order-components/general_auth.js';

//Shared Components
import App from './main/app.js';
import Welcome from './auth-shared/components/welcome.jsx';
import Signin from './auth-shared/components/signin-component.js';
import Signup from './auth-shared/components/signup-component.js';
// ./components/auth/signup-component.js
import AllPhysicians from './patients/components/physicians-dash/allPhysicians.jsx';
// ./components/shared/allPhysicians.jsx
import AllPhysicianProfile from './patients/components/physicians-dash/allPhysicianProfile.jsx'

import Profile from './patients/components/profile-dash/patient-profile.jsx';
import Chat from './patients/containers/messages/chat-container.js';

// Physician Components
import PhysicianApp from './physicians/physician-app/physician-app.jsx';
import PhysicianDashboard from './physicians/components/main-dash/provider-dash.jsx';
import Notes from './physicians/physician-app/notes.jsx';
import Calendar from './physicians/physician-app/calendar.jsx';

import ProvPatProfile from './physicians/components/patient-ind-profile-dash/profile-main.jsx';
// ./components/physician-app/calendar.jsx
import AllUsers from './physicians/components/patients-dash/allUsers.jsx'

// Patient Components
import PatientApp from './patients/components/patient-app.jsx';
import PatientDashboard from './patients/components/main-dash/patient-dashboard.jsx';
import HealthLog from './patients/components/health-log-dash/health-log.jsx';
import Medication from './patients/containers/medication/medication-container.js';
import PhysicianCalendar from './patients/components/physicians-dash/physicianAppointment.jsx';
import PatientAppFormContainer from './patients/components/onboarding/patient-signup-forms.jsx';
import MedicalHistory from './patients/components/medical-history-dash/medical-history-dashboard.jsx';
import MedicalHistoryUpload from './patients/components/medical-history-dash/uploadDocuments.jsx';

// Staff Components
import StaffApp from './staff/components/staff-app.jsx';
import StaffAppFormContainer from './staff/components/onboarding/staff-signup-forms.jsx';
import StaffDashboard from './staff/components/main-dash/staff-dashboard.jsx';

export default (
    <Router path='/' component= { App } >
        <IndexRoute component={ GeneralAuth(Welcome) }/>
        <Route path='signup' component={ GeneralAuth(Signup) } />
        <Route path='signin' component={ GeneralAuth(Signin) } />
        <Route path='provider' component={ PhysicianAuth(PhysicianApp) } >
            <Route path="dashboard" component={ PhysicianDashboard } />
            <Route path="patients" component={ AllUsers } >
              <Route path=':patientId' component={ ProvPatProfile } />
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
            <Route path="physicians" component={ AllPhysicians } />
              <Route path='physicians/:provider' component={ AllPhysicianProfile } >
                <Route path='individual' component={ PhysicianCalendar } />
              </Route>
            <Route path="messages" component={ Chat } />
            <Route path="profile" component={ Profile } />
            <Route path="medications" component={ Medication } />
            <Route path="records" component={ MedicalHistory } />
            <Route path="records/upload" component={ MedicalHistoryUpload } />
        </Route>
        <Route path='staff' component={ StaffAuth(StaffApp) } >
          <Route path="form" >
              <IndexRoute component={ StaffAppFormContainer } />
          </Route>
          <Route path="dashboard" component={ StaffDashboard } />
          
        </Route>
    </Router>
);
