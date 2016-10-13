import axios from 'axios';
import {
  PHYSICIAN_FETCH_PATIENTS, PHYSICIAN_FETCH_PATIENTS_FAILURE,
  CHECK_MY_RELATIONSHIP_REQUEST,
  CHECK_MY_RELATIONSHIP_SUCCESS, CHECK_MY_RELATIONSHIP_FAILURE,
  REMOVE_RELATIONSHIP_REQUEST, REMOVE_RELATIONSHIP_SUCCESS,
  REMOVE_RELATIONSHIP_FAILURE
} from './action-constants';


const fetchPhysicianPatients = (patients) => {
	return {
		type: PHYSICIAN_FETCH_PATIENTS,
		loaded: true,
		payload: patients
	}
}

const fetchPhysicianPatientsFailure = (err) => {
	return {
		type: PHYSICIAN_FETCH_PATIENTS_FAILURE,
		loaded: false,
		payload: err
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


//CHECK IF A RELATIONSHIP EXISTS

const checkMyRelationshipRequest = (relationship) => {
	return {
		type: CHECK_MY_RELATIONSHIP_REQUEST,
		relation: false,
	}
}

const checkMyRelationshipSuccess = (response) => {
	return {
		type: CHECK_MY_RELATIONSHIP_SUCCESS,
		relation: response,
	}
}

const checkMyRelationshipFailure = (err) => {
	return {
		type: CHECK_MY_RELATIONSHIP_FAILURE,
		relation: false,
		payload: err
	}
}

export const checkMyRelationship = (relationship) => {
  return dispatch => {
    dispatch(checkMyRelationshipRequest(relationship));
    return axios.post('/api/relation', relationship)
      .then(response => {
        response.data.length > 0 ?
        dispatch(checkMyRelationshipSuccess(true)) :
        dispatch(checkMyRelationshipSuccess(false))
      })
      .catch(error => checkMyRelationshipFailure(error));
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
  return dispatch => {
    dispatch(removeRelationshipRequest());
    return axios.post(`/api/relation/delete`, relationship)
      .then(response =>{
        dispatch(removeRelationshipSuccess());
	  })
      .catch(error => dispatch(removeRelationshipFailure(error)) )
  }
}
