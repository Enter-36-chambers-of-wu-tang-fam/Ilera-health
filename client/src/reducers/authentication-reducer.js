import * as types from '../actions/action-types.js';

const authenticate = {

authenticated: (state = {authenticated: localStorage.getItem('uid'), userType: localStorage.getItem('userType')}, action) => {
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
          },
          
  logout: (state = {}, action) => {
            switch(action.type) {
              case types.LOGOUT_REQUEST:
                console.log("LOGING OUT REQUEST");
                return {...state, loggedOut: action.loggedOut, isFetching: action.isFetching}
              case types.LOGOUT_SUCCESS:
                console.log("LOGING OUT SUCCESS");
                return {...state, loggedOut: action.loggedOut, isFetching: action.isFetching}
              case types.LOGOUT_FAILURE:
                console.log("LOGGING OUT FAILURE");
                return {...state, loggedOut: action.loggedOut, isFetching: action.isFetching, message: action.message }
              default:
                return state
            }
          }
}

export default authenticate;
