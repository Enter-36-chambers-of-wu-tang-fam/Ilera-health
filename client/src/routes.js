// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { Router, Route, IndexRoute } from 'react-router';

//Authentication Requirement
import PhysicianAuth from './auth-shared/higher-order-components/physician_auth.jsx';
import PatientAuth from './auth-shared/higher-order-components/patient_auth.jsx';
import StaffAuth from './auth-shared/higher-order-components/staff_auth.jsx';
import GeneralAuth from './auth-shared/higher-order-components/general_auth.jsx';

//Shared Components
import App from './main/app.js';
import Welcome from './auth-shared/components/landing-page/welcome.jsx';
import Signin from './auth-shared/components/signin-component.jsx';
import Signup from './auth-shared/components/signup-component.jsx';
import AllPhysicians from './patients/components/physicians-dash/allPhysicians.jsx';
import AllPhysicianProfile from './patients/components/physicians-dash/allPhysicianProfile.jsx'
import Chat from './patients/containers/messages/chat-container.js';

// Physician Components
import PhysicianApp from './physicians/physician-app/physician-app.jsx';
import ProviderAppFormContainer from './physicians/containers/onboarding/provider-signup-forms.jsx';
import PhysicianDashboard from './physicians/containers/main-dash/provider-dash.jsx';
import Notes from './physicians/physician-app/notes.jsx';
import Calendar from './physicians/physician-app/calendar.jsx';
import ProvPatProfile from './physicians/components/patient-ind-profile-dash/profile-main.jsx';
import AllUsers from './physicians/components/patients-dash/allUsers.jsx'
import PhysProfile from './physicians/components/profile-dash/patient-profile.jsx';

// Patient Components
import PatientApp from './patients/containers/patient-app.jsx';
import PatientDashboard from './patients/containers/main-dash/patient-dashboard.jsx';
import HealthLog from './patients/components/health-log-dash/health-log.jsx';
import Profile from './patients/components/profile-dash/patient-profile.jsx';
import Medication from './patients/containers/medication/medication-container.js';
import PhysicianCalendar from './patients/components/physicians-dash/physicianAppointment.jsx';
import PatientAppFormContainer from './patients/components/onboarding/patient-signup-forms.jsx';
import MedicalHistory from './patients/components/medical-history-dash/medical-history-dashboard.jsx';
import MedicalHistoryUpload from './patients/components/medical-history-dash/uploadDocuments.jsx';
import MedicalHistoryAppointment from './patients/components/medical-history-dash/appointment-history-dashboard.jsx';

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
            <Route path="welcome" >
                <IndexRoute component={ ProviderAppFormContainer } />
            </Route>
            <Route path="dashboard" component={ PhysicianDashboard } />
            <Route path="/provider/patients" component={ AllUsers } />
            <Route path='/provider/patients/:patientId' component={ ProvPatProfile } />
            <Route path='test' component={ ProvPatProfile } />
            <Route path="notes" component={ Notes } />
            <Route path="messages" component={ Chat } />
            <Route path="profile" component={ PhysProfile } />
            <Route path="calendar" component ={ Calendar }/>
        </Route>
        <Route path='patient' component={ PatientAuth(PatientApp) } >
            <Route path="welcome" >
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
            <Route path="records/appointments" component={ MedicalHistoryAppointment } />
        </Route>
        <Route path='staff' component={ StaffAuth(StaffApp) } >
          <Route path="form" >
              <IndexRoute component={ StaffAppFormContainer } />
          </Route>
          <Route path="dashboard" component={ StaffDashboard } />

        </Route>
    </Router>
);