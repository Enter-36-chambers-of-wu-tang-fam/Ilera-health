import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import authenticate from './authentication-reducer.js';
import medication from './medication-reducer.js';
import messages from './messages-reducer.js';
import contacts from './contacts-reducer.js';
import appointments from './appointment-reducer.js';
import profile from './profile-reducer.js';
import healthLog from './health-log-reducer';
import userInfo from './user-reducer';

const rootReducer = combineReducers({
    authentication: authenticate.authenticated,
    allPhysicianAppointments: appointments.physAppt,
    form: formReducer,
    meds: medication,
    messages: messages,
    contacts: contacts,
    profile: profile,
    healthLogs: healthLog,
    user: userInfo
});

export default rootReducer;
