import {GET_RECORDS_REQUEST, GET_RECORDS_SUCCESS, GET_RECORDS_FAILURE,
DELETE_RECORDS_REQUEST, DELETE_RECORDS_SUCCESS, DELETE_RECORDS_FAILURE
} from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  records: [],
};

export default function recordsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECORDS_REQUEST:
        return { ...state, isFetching: action.isFetching }
    case GET_RECORDS_SUCCESS:
        return { ...state, isFetching: action.isFetching, records: action.payload }
    case GET_RECORDS_FAILURE:
        return { ...state, isFetching: action.isFetching, records: action.payload }

    case DELETE_RECORDS_REQUEST:
        return { ...state, isFetching: action.isFetching }
    case DELETE_RECORDS_SUCCESS:
        return { ...state, isFetching: action.isFetching }
    case DELETE_RECORDS_FAILURE:
        return { ...state, isFetching: action.isFetching}
        
    default:
      return state;
  }
};