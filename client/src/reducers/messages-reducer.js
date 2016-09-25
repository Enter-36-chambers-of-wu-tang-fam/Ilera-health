import {
  MESSAGE_ADD_SUCCESS, MESSAGE_ADD_REQUEST, MESSAGE_ADD_FAILURE
} from '../actions/action-types.js';


export default function messageReducer(state = {}, action) {
  switch (action.type) {
    case MESSAGE_ADD_REQUEST:
        console.log("ADDSTUDENT_REQUEST");
        return Object.assign({}, state, {
            isFetching: true,
        })
    case MESSAGE_ADD_SUCCESS:
      console.log("MESSAGE_ADD_SUCCESS");
      return Object.assign({}, state, {
        isFetching: false,
        newAssignment: action.newAssignment,
      })
    case MESSAGE_ADD_FAILURE:
      console.log("MESSAGE_ADD_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        newAssignment: null,
      })
    default:
      return state;
  }
};