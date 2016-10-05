import {
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
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
    console.log("YOLO", action.payload, action.payload.userBasic)
      return { 
        ...state, 
        isFetching: false, 
        loaded: true, 
        userBasic: action.payload.userBasic,
        userHealth: action.payload.userHealth,
        userEContacts: action.payload.userEContacts,
        userInsurance: action.payload.userInsurance 
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