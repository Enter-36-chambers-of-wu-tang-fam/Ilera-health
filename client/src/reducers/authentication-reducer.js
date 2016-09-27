import * as types from '../actions/action-types.js';

export default function(state={authenticated: localStorage.getItem('uid'), userType: localStorage.getItem('userType')}, action){
  switch(action.type) {
    case types.AUTHENTICATE:
     return Object.assign({},state, {
        authenticated: action.payload,
        userType: action.userType
     })
  }
  return state;
}

