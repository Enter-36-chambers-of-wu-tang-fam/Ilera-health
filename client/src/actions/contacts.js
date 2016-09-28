import axios from 'axios';
import * as types from './action-types';

const fetchPatientPhysicians = (physicians) => {
	return {
		type: types.PATIENT_FETCH_PHYSICIANS,
		loaded: true,
		payload: physicians
	}
}

const fetchPatientPhysiciansFailure = (err) => {
	return {
		type: types.PATIENT_FETCH_PHYSICIANS_FAILURE,
		loaded: false,
		payload: err
	}
}

const fetchPhysicianPatients = (patients) => {
	return {
		type: types.PHYSICIAN_FETCH_PATIENTS,
		loaded: true,
		payload: patients
	}
}

const fetchPhysicianPatientsFailure = (err) => {
	return {
		type: types.PHYSICIAN_FETCH_PATIENTS_FAILURE,
		loaded: false,
		payload: err
	}
}

export function fetchMyPhysicians(userid) {
  console.log("FETCH MY PHYSICIANS")
  return dispatch => {
    return axios.get(`/api/patient/${userid}/physicians`)
      .then(response =>{
        console.log("RESPONSE FETCH PATIENTS", response)
        dispatch(fetchPhysicianPatients(response));	  
	  })
      .catch(error => {
		  dispatch(fetchPhysicianPatientsFailure(error));
	  });
  }
}


export function fetchMyPatients(userid) {
  console.log("FETCH MY PATIENTS")
  return dispatch => {
    return axios.get(`/api/physician/${userid}/patients`)
      .then(response =>{
        console.log("RESPONSE", response)
        dispatch(fetchPhysicianPatients(response));	  
	  })
      .catch(error => {
		  dispatch(fetchPhysicianPatientsFailure(error));
	  });
  }
}

