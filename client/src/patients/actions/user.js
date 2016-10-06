import axios from 'axios';
import * as types from './action-constants';

/////////////// GET ALL USER INFO //////////////////

const getUserInfoRequest = () => {
  return {
    type: types.GET_USER_INFO_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getUserInfoSuccess = (user) =>{
  return {
      type: types.GET_USER_INFO_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: user
    }
};

const getUserInfoFailed = (err) => {
  return {
    type: types.GET_USER_INFO_FAILURE,
    payload: err
  }
};

//Action call below for sign up --> uncomment export default

export function getUserInfo(uid) {
    console.log("HELLO?", uid)
  return (dispatch) => {
    dispatch(getUserInfoRequest());

    axios.get(`/api/allPatient/${uid}`)
    .then( user => {
      console.log("USER", user.data.patient[0])
      var patient = {};
      for(var item in user.data.patient[0]){
        if(item === 'id' || item === 'password' || item === 'email'){
          continue;
        }
        if(user.data.patient[0][item]){
          patient[item] = user.data.patient[0][item];
        }
      }

      console.log("yoyo", patient)
      localStorage.setItem('appointment',JSON.stringify(user.data.appointment));
      localStorage.setItem('healthLog',JSON.stringify(user.data.healthLog));
      localStorage.setItem('insurance',JSON.stringify(user.data.insurance));
      localStorage.setItem('medication',JSON.stringify(user.data.medication));
      localStorage.setItem('patient',JSON.stringify(patient));
      localStorage.setItem('provider',JSON.stringify(user.data.provider));
      dispatch(getUserInfoSuccess(user.data))
    })
    .catch(err => {
      dispatch(getUserInfoFailed(err));
    });
  }
}
