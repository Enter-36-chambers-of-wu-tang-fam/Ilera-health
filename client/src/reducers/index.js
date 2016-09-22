import { combineReducers } from 'redux';

import authentication from './authentication-reducer.js';

const rootReducer = combineReducers({
    authentication: authentication
});

export default rootReducer;