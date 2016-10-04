import * as types from '../../patients/actions/action-constants';

const initialState = {
  isFetching: false,
  loaded: false,
  healthLogs: [],

}

export default function healthLogsReducer(state = initialState, action){
  switch(action.type) {
    case types.HEALTH_LOG_FETCH_REQUEST:
      return {
        ...state,
        loaded: true,
        healthlogs: action.payload
      }
    case types.HEALTH_LOG_FETCH_REQUEST_FAILURE:
      return {
        ...state,
        loaded: false
      }
    default:
      return state;
  }
};
