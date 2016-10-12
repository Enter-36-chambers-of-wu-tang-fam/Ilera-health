import {
  GET_PROVIDER_REQUEST, GET_PROVIDER_SUCCESS, GET_PROVIDER_FAILURE, DID_INIT
} from '../../physicians/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  init: false,
  provider: {}
};

export default function providerInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROVIDER_REQUEST:
        return { 
            ...state, 
            isFetching: true, 
            loaded: false,
        }
    case GET_PROVIDER_SUCCESS:
      return { 
        ...state, 
        isFetching: false, 
        loaded: true,
        init: false,
        provider: action.payload
      }
    case GET_PROVIDER_FAILURE:
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