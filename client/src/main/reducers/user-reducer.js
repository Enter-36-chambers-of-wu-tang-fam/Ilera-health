import {
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
  GET_USER_INSURANCE_REQUEST, GET_USER_INSURANCE_SUCCESS,
  GET_USER_INSURANCE_FAILURE, GET_ALL_USER_REMINDERS_REQUEST,
  GET_ALL_USER_REMINDERS_SUCCESS, GET_ALL_USER_REMINDERS_FAILURE,
  GET_USER_CONTACTS_REQUEST, GET_USER_CONTACTS_SUCCESS,
  GET_USER_CONTACTS_FAILURE, DID_INIT
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  init: false,
  user: {},
  e_contacts: {},
  appointment: [],
  healthLog: [],
  insurance: [],
  medication: [],
  patient: [],
  provider: [],
  reminders: []
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
			return {
				...state,
				isFetching: true,
				loaded: false,
			}
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
        init: false,
        user: action.user,
        contacts: action.contacts
      }
    case GET_USER_INFO_FAILURE:
      return {
          ...state,
          isFetching: false,
          loaded: false
      }
    case GET_USER_INSURANCE_REQUEST:
			return {
				...state,
				isFetching: true,
				loaded: false
			}
    case GET_USER_INSURANCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
        init: false,
        insurance: action.payload
      }
    case GET_USER_INSURANCE_FAILURE:
      return {
          ...state,
          isFetching: false,
          loaded: false,
          err: action.payload
      }
    case GET_ALL_USER_REMINDERS_REQUEST:
			return {
				...state,
				isFetching: true,
				loaded: false
			}
    case GET_ALL_USER_REMINDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
        init: false,
        reminders: action.payload
      }
    case GET_ALL_USER_REMINDERS_FAILURE:
      return {
          ...state,
          isFetching: false,
          loaded: false,
          err: action.payload
      }
    case GET_USER_CONTACTS_REQUEST:
			return {
				...state,
				isFetching: true,
				loaded: false
			}
    case GET_USER_CONTACTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
        init: false,
        e_contacts: action.payload
      }
    case GET_USER_CONTACTS_FAILURE:
      return {
          ...state,
          isFetching: false,
          loaded: false
      }
    case DID_INIT:
      return {
          ...state,
          init: action.payload
      }
    default:
      return {...state};
  }
};
