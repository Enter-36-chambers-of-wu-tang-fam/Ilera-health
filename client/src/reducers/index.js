import { combineReducers } from 'redux';
import PhysicianListReducer from './physician-list-reducer';

import { reducer as formReducer } from 'redux-form';

import authenticate from './authentication-reducer.js';
import medication from './medication-reducer.js';
import messages from './messages-reducer.js';
import contacts from './contacts-reducer.js';
import appointments from './appointment-reducer.js';

const rootReducer = combineReducers({
    authentication: authenticate.authenticated,
    allPhysicianAppointments: appointments.physAppt,
    form: formReducer,
    medication: medication,
    messages: messages,
    contacts: contacts,
    physicians: PhysicianListReducer

});

export default rootReducer;
