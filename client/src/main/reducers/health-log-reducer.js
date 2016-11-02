import * as types from '../../patients/actions/action-constants';

const initialState = {
  isFetching: false,
  loaded: false,
  healthLogs: []
}

export default function healthLogsReducer(state = initialState, action){
  switch(action.type) {
    case types.HEALTH_LOG_FETCH_REQUEST:
      return {
        ...state,
        loaded: false,
        isFetching: true
      }
    case types.HEALTH_LOG_FETCH_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        loaded: false
      }
    case types.HEALTH_LOG_FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: true,
        healthLogs: action.payload 
      }
    default:
      return state;
  }
};
