import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import authenticated from './authentication-reducer.js';
import messages from './messages-reducer.js';
import contacts from './contacts-reducer.js';

const rootReducer = combineReducers({
    authentication: authenticated,
    form: formReducer.plugin({
        login: (state, action) => {   
        switch(action.type) {
            case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                values: {
                ...state.values,
                password: undefined // <----- clear password value
                },
                fields: {
                ...state.fields,
                password: undefined // <----- clear field state, too (touched, etc.)
                }
            }
            default:
            return state
        }
        }
    }),
    messages: messages,
    contacts: contacts
});

export default rootReducer;