import { CHANGE_AUTH } from '../actions/action-types.js';

export default function(state = {authenticated: localStorage.getItem('uid'), userType: localStorage.getItem('userType')}, action){
  switch(action.type) {
    case CHANGE_AUTH:
     return Object.assign({}, {
        authenticated: action.payload,
        userType: action.userType
     })
  }
  return state;
}

