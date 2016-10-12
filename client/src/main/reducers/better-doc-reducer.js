import {
  BETTER_DOC_INFO_REQUEST, BETTER_DOC_INFO_SUCCESS, BETTER_DOC_INFO_FAILURE
} from '../../physicians/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  doc: {}
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case BETTER_DOC_INFO_REQUEST:
			return {
				...state, 
				isFetching: true, 
				loaded: false,
			}
    case BETTER_DOC_INFO_SUCCESS:
      return { 
        ...state, 
        isFetching: false, 
        loaded: true,
        doc: action.payload
      }
    case BETTER_DOC_INFO_FAILURE:
      return { 
          ...state, 
          isFetching: false, 
          loaded: false 
      }
    default:
      return {...state};
  }
};