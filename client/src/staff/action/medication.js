import axios from 'axios';
import * as types from './action-constants';

// note to slef add routes for medication in server

const fetchMedsRequest = () => {
	return {
		type: types.MEDS_FETCH_REQUEST,
		isFetching: true,
	}
}

const fetchMedsSuccess = medication => {
	return {
		type: types.MEDS_FETCH_SUCCESS,
		isFetching: false,
		payload: medication
	}
}

const fetchMedsFailure = err => {
	return {
		type: types.MEDS_FETCH_FAILURE,
		isFetching: false,
		payload: err
	}
}

const medClicked = med => {
	return {
		type: types.MED_CHOSEN,
		payload: med
	}
}
// export const getAllPatientMediaction = patid => {
//   console.log("getAllPatientMediaction-==-Drugs should be handled with care-==-");
//   return dispatch => {
//     dispatch(fetchMedsRequest())
// 		dispatch(fetchMedsSuccess(['yolo']))
//   }
//
// };
export const getAllPatientMedication = userid => {
  console.log("getAllPatientMedication-==-Drugs should be handled with care-==-");
	console.log(userid);
  return dispatch => {
    dispatch(fetchMedsRequest())
    return axios.get(`/api/patient/medications/${userid}`)
      .then(res => {
				console.log(res);
        dispatch(fetchMedsSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchMedsFailure(err));
      })
  }

};
// /api/patient/medications/:userid
export const medChosen = med => {
	console.log("action med chosen");
	return dispatch =>{
		dispatch(medClicked(med))
	}
}
