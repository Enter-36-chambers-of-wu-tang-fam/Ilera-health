import axios from 'axios';
import * as types from './action-constants';

const fetchMedsRequest = () => {
	return {
		type: types.MEDS_FETCH_REQUEST,
		isFetching: true
	};
};

const fetchMedsSuccess = medication => {
	return {
		type: types.MEDS_FETCH_SUCCESS,
		isFetching: false,
		payload: medication
	};
};

const fetchMedsFailure = err => {
	return {
		type: types.MEDS_FETCH_FAILURE,
		isFetching: false,
		payload: err
	};
};

const medClicked = med => {
	return {
		type: types.MED_CHOSEN,
		payload: med
	};
};

export const getAllPatientMedication = userid => {
  return dispatch => {
    dispatch(fetchMedsRequest())
    return axios.get(`/api/patient/medications/${userid}`)
      .then( res => {
        dispatch( fetchMedsSuccess(res.data) );
      })
      .catch(err => {
        dispatch( fetchMedsFailure(err) );
      });
  };
};

export const medChosen = med => {
	return dispatch =>{
		dispatch( medClicked(med) );
	};
};