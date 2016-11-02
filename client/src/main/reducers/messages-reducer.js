import {
  MESSAGE_ADD_SUCCESS, MESSAGE_ADD_REQUEST, MESSAGE_ADD_FAILURE,
  MESSAGE_FETCH_REQUEST, MESSAGE_FETCH_SUCCESS, MESSAGE_FETCH_FAILURE,
  RECEIVE_MESSAGE
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  messages: [],
  fetchHistory: []
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_ADD_REQUEST:
        return {
          ...state,
          isFetching: true,
          loaded: false
        }
    case MESSAGE_ADD_SUCCESS:
    console.log("$$", state.messages, action.payload)
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isFetching: false,
        loaded: true,
        newMessage: action.payload
      }
    case MESSAGE_ADD_FAILURE:
      return {
          ...state,
          isFetching: false,
          loaded: false
      }
    case MESSAGE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        loaded: false
      }
    case MESSAGE_FETCH_SUCCESS:
      return {
        ...state,
        messages: [action.payload],
        isFetching: false,
        loaded: true
      }
    case MESSAGE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        loaded: false
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        newMessage: action.payload
      };
    default:
      return state;
  }
};
