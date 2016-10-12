import axios from 'axios';
import * as types from './action-constants.js';

var fetchBetterDocInfoRequest = () => {
  return {
    type: types.BETTER_DOC_INFO_REQUEST ,
    loaded: false,
    isFetching: true
  }
}

var fetchBetterDocInfoSuccess = (info) => {
  return {
    type: types.BETTER_DOC_INFO_SUCCESS,
    loaded: false,
    payload: info
  }
}

var fetchBetterDocInfoFailure = (err) => {
  return {
    type: types.BETTER_DOC_INFO_FAILURE,
    loaded: false,
    payload: err
  }
}

export function getDocInfo(uid){
  return (dispatch) => {
    fetchBetterDocInfoRequest()
    return axios.get(`https://api.betterdoctor.com/2016-03-01/doctors/${uid}?user_key=bdd1495417e49ba2f1aa40461ce8f17d`)
    .then(response => {
      dispatch(fetchBetterDocInfoSuccess(response));
    })
    .catch(error => {
      dispatch (fetchBetterDocInfoFailure(error));
    });
  }
}
