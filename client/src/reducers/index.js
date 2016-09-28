import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import authenticated from './authentication-reducer.js';
import messages from './messages-reducer.js';
import contacts from './contacts-reducer.js';

const rootReducer = combineReducers({
    authentication: authenticated,
    form: formReducer,
    messages: messages,
    contacts: contacts
});

export default rootReducer;