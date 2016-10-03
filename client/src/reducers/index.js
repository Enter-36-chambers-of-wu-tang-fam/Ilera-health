import { combineReducers } from 'redux';
import PhysicianListReducer from './physician-list-reducer';

import { reducer as formReducer } from 'redux-form';

import authenticate from './authentication-reducer.js';
import messages from './messages-reducer.js';
import contacts from './contacts-reducer.js';
import appointments from './appointment-reducer.js';
import profile from './profile-reducer.js';

const rootReducer = combineReducers({
    authentication: authenticate.authenticated,
    allPhysicianAppointments: appointments.physAppt,
    form: formReducer,
    messages: messages,
    contacts: contacts,
    profile: profile,
    physicians: PhysicianListReducer

});

export default rootReducer;
