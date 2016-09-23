import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import authentication from './authentication-reducer.js';

const rootReducer = combineReducers({
    authentication: authentication,
    form: formReducer
});

export default rootReducer;