import axios from 'axios';
import {GET_RECORDS_REQUEST, GET_RECORDS_SUCCESS, GET_RECORDS_FAILURE,
  DELETE_RECORDS_REQUEST, DELETE_RECORDS_SUCCESS, DELETE_RECORDS_FAILURE
} from './action-constants';

/* GET MEDICAL RECORDS REQUEST */

const getRecordsRequest = () => {
  return {
    type: GET_RECORDS_REQUEST,
    isFetching: true
  }
};

const getRecordsSuccess = (records) => {
  return {
    type: GET_RECORDS_SUCCESS,
    isFetching: false,
    payload: records
  }
};

const getRecordsFailure = (errorMsg) => {
  return {
    type: GET_RECORDS_FAILURE,
    isFetching: false,
    payload: errorMsg
  }
};


export const getRecords = (uid) => {
  return function(dispatch){
    dispatch(getRecordsRequest());
    axios.get(`/api/patient/getRecords/${uid}`)
      .then(records => {
        dispatch(getRecordsSuccess(records));
      })
      .catch(error => dispatch(getRecordsFailure(error)))
  }
}

/* DELETE MEDICAL RECORDS REQUEST */


const deleteRecordsRequest = () => {
  return {
    type: DELETE_RECORDS_REQUEST,
    isFetching: true
  }
};

const deleteRecordsSuccess = (deletion) => {
  return {
    type: DELETE_RECORDS_SUCCESS,
    isFetching: false,
    payload: deletion
  }
};

const deleteRecordsFailure = (errorMsg) => {
  return {
    type: DELETE_RECORDS_FAILURE,
    isFetching: false,
    payload: errorMsg
  }
};


export const deleteRecords = (data,uid) => {
  return function(dispatch){
    dispatch(deleteRecordsRequest());
    axios.post(`/api/patient/deleteRecords/${uid}`, data)
      .then(deletion => {
        dispatch(deleteRecordsSuccess(deletion));
      })
      .catch(error => dispatch(deleteRecordsFailure(error)))
  }
}
