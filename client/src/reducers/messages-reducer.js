import {
  MESSAGE_ADD_SUCCESS, MESSAGE_ADD_REQUEST, MESSAGE_ADD_FAILURE, MESSAGE_FETCH_REQUEST, MESSAGE_FETCH_SUCCESS, MESSAGE_FETCH_FAILURE, RECEIVE_MESSAGE
} from '../actions/action-types.js';

const initialState = {
  isFetching: false,
  loaded: false,
  messages: [],
  fetchHistory: []
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_ADD_REQUEST:
        console.log("MESSAGE_ADD");
        return Object.assign({}, state, {
            isFetching: true,
            loaded: false
        })
    case MESSAGE_ADD_SUCCESS:
      console.log("MESSAGE_ADD_SUCCESS", action.payload);
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        messages: [],
        newMessage: messages.push(action.payload)
      })
    case MESSAGE_ADD_FAILURE:
      console.log("MESSAGE_ADD_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
      })
    case MESSAGE_FETCH_REQUEST:
      console.log("MESSAGE_FETCH_REQUEST");
      return Object.assign({}, state, {
        isFetching: true,
        loaded: false
      })
    case MESSAGE_FETCH_SUCCESS:
      console.log("MESSAGE_FETCH_SUCCESS");
        console.log("ACTION", action.payload)
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        messages: action.payload.data
      })
    case MESSAGE_FETCH_FAILURE:
      console.log("MESSAGE_FETCH_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        loaded: false
      })
    case RECEIVE_MESSAGE:
      console.log("RECEIVE_MESSAGE");
      return {...state,
        data: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};