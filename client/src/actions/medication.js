import axios from 'axios';
import * as types from './action-types.js';

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
export const getAllPatientMediaction = patid => {
  console.log("getAllPatientMediaction-==-Drugs should be handled with care-==-");
  return dispatch => {
    dispatch(fetchMedsRequest())
		dispatch(fetchMedsSuccess(['yolo']))
  }

};
// export const getAllPatientMediaction = patid => {
//   console.log("getAllPatientMediaction-==-Drugs should be handled with care-==-");
//   return dispatch => {
//     dispatch(fetchMedsRequest())
//     return axios.get(`/api/medication/${patid} something like this`)
//       .then(res => {
//         dispatch(fetchMedsSuccess(res))
//       })
//       .catch(err => {
//         dispatch(fetchMedsFailure(err));
//       })
//   }
//
// };
