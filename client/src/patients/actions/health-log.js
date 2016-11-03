import axios from 'axios';
import * as types from './action-constants';

const fetchHealthLogs = (healthlogs) => {
  return {
    type: types.HEALTH_LOG_FETCH_REQUEST,
    isFetching: true
  }
}

const fetchHealthLogsFailure = (err) => {
  return {
    type: types.HEALTH_LOG_FETCH_REQUEST_FAILURE,
    isFetching: false,
    payload: err
  }
}

const fetchHealthLogsSuccess = logs => {
  return {
    type: types.HEALTH_LOG_FETCH_REQUEST_SUCCESS,
    isFetching: false,
    payload: logs
  }
}

export function fetchAllHealhlogsPatient(uid){
  console.error('fetchAllHealhlogsPatient CALLED', uid);
  return function(dispatch){
    dispatch(fetchHealthLogs());
    axios.get(`http://localhost:3636/api/healthlog/${uid}`)
    .then(healthLog =>
      dispatch(fetchHealthLogsSuccess(healthLog)))
    .catch(err =>
      dispatch(fetchHealthLogsFailure(err)))
  }
}
