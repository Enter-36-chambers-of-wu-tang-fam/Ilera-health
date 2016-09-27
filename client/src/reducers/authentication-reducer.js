import { CHANGE_AUTH } from '../actions/action-types.js';

export default function(state =  localStorage.getItem('uid'), action){
  switch(action.type) {
    case CHANGE_AUTH:
     return Object.assign({}, state, {
        authenticated: action.payload,
        userType: action.userType
     })
  }
  return state;
}

