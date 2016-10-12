import * as types from '../../auth-shared/actions/action-constants.js';

const initialState = {
  authenticated: localStorage.uid,
  userType: localStorage.userType
}

const authenticate = {

authenticated: (state = initialState, action = {}) => {
    switch(action.type) {
      case types.AUTH_REQUEST:
        console.log("AUTH REQUEST");
        return {...state, authenticated: action.payload, userType: action.userType }
      case types.AUTH_SUCCESS:
        console.log("AUTH SUCCESS");
        return {...state, authenticated: action.payload, userType: action.userType, signUp: action.signUp }
      case types.AUTH_FAILURE:
        console.log("AUTH FAILURE");
        return {...state, authenticated: action.payload, userType: action.userType, message: action.message }
      default:
        return state
    }
  }
}

export default authenticate;
