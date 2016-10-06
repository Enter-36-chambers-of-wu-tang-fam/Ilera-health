import {
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  appointment: [],
  healthLog: [],
  insurance: [],
  medication: [],
  patient: [],
  provider: []
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
    console.log("YOLO", action.payload)
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
    default:
      return {...state};
  }
};