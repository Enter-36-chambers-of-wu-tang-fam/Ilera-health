import axios from 'axios';
import * as types './action-constants';

const fetchHealthLogs(healthlogs) => {
  return {
    type: types.HEALTH_LOG_FETCH_REQUEST ,
    loaded: true,
    payload: healthLogs,
  }
}

const fetchHealthLogsFailure(err) => {
  return {
    type: types.HEALTH_LOG_FETCH_REQUEST_FAILURE,
    loaded: false,
    payload: err
  }
}


export function fetchAllHealhlogs(){
  return (dispatch) => {
    return axios.get(`http://localhost:3636/api/healthlog`)
    .then(response => {
      dispatch(fetchHealthLogs(response));
    })
    .catch(error => {
      dispatch (fetchHealthLogsFailure(error));
    });
  }
}
