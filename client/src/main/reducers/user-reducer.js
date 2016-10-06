import {
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE, GET_USER_INSURANCE_REQUEST, GET_USER_INSURANCE_SUCCESS, GET_USER_INSURANCE_FAILURE, GET_ALL_USER_REMINDERS_REQUEST, GET_ALL_USER_REMINDERS_SUCCESS, GET_ALL_USER_REMINDERS_FAILURE
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
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
				loaded: false 
			}
    case GET_USER_INFO_SUCCESS:
      return { 
        ...state, 
        isFetching: false, 
        loaded: true,
        appointment: action.payload.appointment,
        healthLog: action.payload.healthLog,
        insurance: action.payload.insurance,
        medication: action.payload.medication,
        patient: action.payload.patient,
        provider: action.payload.provider
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
        reminders: action.payload
      }
    case GET_ALL_USER_REMINDERS_FAILURE:
      return { 
          ...state, 
          isFetching: false, 
          loaded: false,
          err: action.payload 
      }
    default:
      return {...state};
  }
};