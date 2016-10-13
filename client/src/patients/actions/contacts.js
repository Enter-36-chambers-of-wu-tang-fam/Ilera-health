import axios from 'axios';
import * as types from './action-constants';

//FETCH FUNCTIONS FOR PATIENT AND PHYSICIANS
const fetchPatientPhysicians = ( physicians ) => {
	return {
		type: types.PATIENT_FETCH_PHYSICIANS,
		loaded: true,
		payload: physicians
	};
};

const fetchPatientPhysiciansFailure = ( err ) => {
	return {
		type: types.PATIENT_FETCH_PHYSICIANS_FAILURE,
		loaded: false,
		payload: err
	};
};

const fetchPhysicianPatients = ( patients ) => {
	return {
		type: types.PHYSICIAN_FETCH_PATIENTS,
		loaded: true,
		payload: patients
	};
};

const fetchPhysicianPatientsFailure = ( err ) => {
	return {
		type: types.PHYSICIAN_FETCH_PATIENTS_FAILURE,
		loaded: false,
		payload: err
	};
};

export function fetchMyPhysicians( userid ) {
  return dispatch => {
    return axios.get(`/api/patient/${userid}/physicians`)
		.then( response =>{
			dispatch( fetchPatientPhysicians(response) );
	  })
		.catch( error => {
		  dispatch( fetchPatientPhysiciansFailure(error) );
	  });
  }
}


export function fetchMyPatients( userid ) {
	return dispatch => {
    return axios.get(`/api/physician/${userid}/patients`)
		.then( response => {
			dispatch( fetchPhysicianPatients(response) );
	  })
    .catch( error => {
		  dispatch( fetchPhysicianPatientsFailure(error) );
	  });
  };
};

//CREATE RELATIONSHIP FOR PATIENT (MAKE RELATION WITH PHYSICIAN)
const makeMyPhysicianRequest = ( relationship ) => {
	return {
		type: types.MAKE_MY_PHYSICIAN_REQUEST,
		relation: false
	};
};

const makeMyPhysicianSuccess = ( response ) => {
	return {
		type: types.MAKE_MY_PHYSICIAN_SUCCESS,
		relation: true
	};
};

const makeMyPhysicianFailure = ( err ) => {
	return {
		type: types.MAKE_MY_PHYSICIAN_FAILURE,
		loaded: false,
		payload: err
	};
};

export const makeMyPhysician = ( relationship ) => {
  return dispatch => {
    dispatch( makeMyPhysicianRequest( relationship ) );
      return axios.post('/api/physician/addbetterDoc', relationship)
			.then( docId => {
				relationship.id_physician = docId.data;
				axios.post(`/api/relation/create`, relationship)
					.then( response => {
						dispatch( makeMyPhysicianSuccess(response) );
					})
			})
			.catch( error => {
				dispatch( makeMyPhysicianFailure(error) )
			})
  }
};


//CHECK IF A RELATIONSHIP EXISTS
const checkMyRelationshipRequest = ( relationship ) => {
	return {
		type: types.CHECK_MY_RELATIONSHIP_REQUEST,
		relation: false
	};
};

const checkMyRelationshipSuccess = ( response ) => {
	return {
		type: types.CHECK_MY_RELATIONSHIP_SUCCESS,
		relation: response
	};
};

const checkMyRelationshipFailure = ( err ) => {
	return {
		type: types.CHECK_MY_RELATIONSHIP_FAILURE,
		relation: false,
		payload: err
	};
};

export const checkMyRelationship = ( relationship ) => {
  return dispatch => {
    dispatch( checkMyRelationshipRequest(relationship) );
    return axios.post('/api/relation', relationship)
      .then( response => {
        response.data.length > 0 ?
				dispatch(checkMyRelationshipSuccess(true)) :
				dispatch(checkMyRelationshipSuccess(false));    
      })
      .catch( error => checkMyRelationshipFailure(error));
  };
};


//REMOVE RELATIONSHIP (PHYSICIAN AND PATIENT BOTH CAN)
const removeRelationshipRequest = () => {
	return {
		type: types.REMOVE_RELATIONSHIP_REQUEST,
		relation: false
	};
};

const removeRelationshipSuccess = () => {
	return {
		type: types.REMOVE_RELATIONSHIP_SUCCESS,
		relation: true
	};
};

const removeRelationshipFailure = () => {
	return {
		type: types.REMOVE_RELATIONSHIP_FAILURE,
		relation: false
	};
};

export const removeRelationship = ( relationship ) => {
  return dispatch => {
    dispatch(removeRelationshipRequest());
    return axios.post(`/api/relation/delete`, relationship)
		.then( response => {
			dispatch( removeRelationshipSuccess() );
	  })
		.catch( error => dispatch( removeRelationshipFailure( error ) ));
  };
};
