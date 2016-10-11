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
import records from './records-reducer';
import docInfo from './better-doc-reducer.js';

const rootReducer = combineReducers({
    authentication: authenticate.authenticated,
    allPhysicianAppointments: appointments.physAppt,
    contacts: contacts,
    form: formReducer,
    healthLogs: healthLog,
    meds: medication,
    messages: messages,
    profile: profile,
    records: records,
    user: userInfo,
    betterDoc: docInfo
});

export default rootReducer;
