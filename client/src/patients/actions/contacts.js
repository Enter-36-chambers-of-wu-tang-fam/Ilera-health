import axios from 'axios';
<<<<<<< dbc80250cdb466fd2c4c43c183a1186c695b7b8e
import * as types from './action-constants';
=======
import {
  PATIENT_FETCH_PHYSICIANS, PATIENT_FETCH_PHYSICIANS_FAILURE,
  PHYSICIAN_FETCH_PATIENTS, PHYSICIAN_FETCH_PATIENTS_FAILURE,
  MAKE_MY_PHYSICIAN_REQUEST, MAKE_MY_PHYSICIAN_SUCCESS, MAKE_MY_PHYSICIAN_FAILURE,
  REMOVE_RELATIONSHIP_REQUEST, REMOVE_RELATIONSHIP_SUCCESS, REMOVE_RELATIONSHIP_FAILURE
} from './action-constants';

//FETCH FUNCTIONS FOR PATIENT AND PHYSICIANS
>>>>>>> final updates

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

export function fetchMyPhysicians(userid) {
  console.log("FETCH MY PHYSICIANS")
  return dispatch => {
    return axios.get(`/api/patient/${userid}/physicians`)
      .then(response =>{
        console.log("RESPONSE FETCH PATIENTS", response)
        dispatch(fetchPatientPhysicians(response));	  
<<<<<<< 1c6901422f62fdd9ded7683404f86f468b8eb065
=======
	  })
      .catch(error => {
        console.log(error);
		  dispatch(fetchPatientPhysiciansFailure(error));
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
>>>>>>> can create and remove physician relationships
	  })
      .catch(error => {
		  dispatch(fetchPatientPhysiciansFailure(error));
	  });
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

<<<<<<< 1c6901422f62fdd9ded7683404f86f468b8eb065
export function fetchMyPatients(userid) {
  console.log("FETCH MY PATIENTS")
=======
export const makeMyPhysician = (relationship) => {
  console.log("MAKE MY PHYSICIAN")
  return dispatch => {
    dispatch(makeMyPhysicianRequest(relationship));
    return axios.post(`/api/relation/create`, relationship)
      .then(response =>{
        console.log("BEEN MADE MY DOCTOR", response)
        dispatch(makeMyPhysicianSuccess(response));	  
	  })
      .catch(error => dispatch(makeMyPhysicianFailure(error)) )
  }
}

//REMOVE RELATIONSHIP (PHYSICIAN AND PATIENT BOTH CAN)

const removeRelationshipRequest = () => {
	return {
		type: REMOVE_RELATIONSHIP_REQUEST,
		relation: false,
	}
}

const removeRelationshipSuccess = () => {
	return {
		type: REMOVE_RELATIONSHIP_SUCCESS,
		relation: true,
	}
}

const removeRelationshipFailure = () => {
	return {
		type: REMOVE_RELATIONSHIP_FAILURE,
		relation: false,
	}
}

export const removeRelationship = (relationship) => {
  console.log("RELATION", relationship);
>>>>>>> can create and remove physician relationships
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

