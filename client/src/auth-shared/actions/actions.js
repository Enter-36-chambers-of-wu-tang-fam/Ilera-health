// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT

import axios from 'axios';
import CryptoJS from 'crypto-js';
import { browserHistory } from 'react-router'
import * as types from './action-constants';


/***********************SIGN IN && SIGN UP *****************************/

////////////////LOGIN LOGIN LOGIN ///////////////
const requestAuth = (creds) => {
  return {
    type: types.AUTH_REQUEST,
    payload: creds,
    userType: null
  }
};


const verifiedAuth = (user,userType, signUp) =>{
  return {
    type: types.AUTH_SUCCESS,
    payload: user,
    userType: userType,
    signUp: signUp
    }
};

const failedAuth = (message) => {
  return {
    type: types.AUTH_FAILURE,
    payload: null,
    userType: null,
    message: message
  }
};
export function authenticateUser(userType,data,reqType){
  if(reqType === "login"){
    return function(dispatch){
      dispatch(requestAuth(null));
      axios.post(`/api/${userType}/signin`, data)
        .then( found => {
          if(userType === 'patient'){
            var encodedId = CryptoJS.AES.encrypt(String(found.data.id), 'key'); //need to change key
          } else if(userType === 'physician') {
            var encodedId = CryptoJS.AES.encrypt(String(found.data), 'key'); //need to change key
          } else {
            var encodedId = CryptoJS.AES.encrypt(String(found.data), 'key'); //need to change key
          }
          localStorage.setItem('uid',encodedId);
          localStorage.setItem('userType',userType);
          dispatch(verifiedAuth(encodedId,userType,false)); //false -> reroutes to dashboard in place of signup via general_auth component
        })
        .catch( err => dispatch(failedAuth(err)) )
    }
  }
  if(reqType === "signup"){
    return function(dispatch){
      dispatch(requestAuth(data));
      axios.post(`/api/${userType}/signup`, data)
      .then(registered => {
        let encodedId = CryptoJS.AES.encrypt(String(registered.data.user), 'key');  //need to change key to actual key
        localStorage.setItem('uid',encodedId);
        localStorage.setItem('userType',userType);
        localStorage.setItem('first', registered.data.first);
        localStorage.setItem('last', registered.data.last);
        dispatch(verifiedAuth(encodedId, userType, true)); //true --> reroutes to sign up form via general_auth component
      })
      .catch(error => failedAuth(error))
    }
  }
  if(reqType === "logout"){
    return (dispatch) =>{
      dispatch(requestAuth(null));
      axios.post(`/api/${userType}/logout/`).then(loggedout => {
          localStorage.clear();
          dispatch(verifiedAuth(null,null,false));
      })
      .catch(error => dispatch(failedAuth(error)));
    }
  }
};


///////////////CONTACT INFO | CONTACT INFO | CONTACT INFO ///////////////

const requestContactPost = (info) => {
  return {
    type: types.CONTACT_POST_REQUEST,
    payload: info
  }
};


const verifiedContactPost = (info) =>{
  return {
      type: types.CONTACT_POST_SUCCESS,
      payload: info
    }
};

const failedContactPost = (message) => {
  return {
    type: types.CONTACT_POST_FAILURE,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export const contactPost = (id, info, userType) => {
  return (dispatch) => {
    dispatch(requestContactPost(info));

    let contactInformation = {
      phone: info.phone,
      address: info.address,
      city: info.city,
      state: info.state,
      zip: info.zip
    };
    axios.post(`api/contactinfo/${userType}/${id}`).then(verified =>{
      dispatch(verifiedContactPost(verified))
    })
    .catch(response => {
      dispatch(failedContactPost(response));
    });
  }
}



////////////////HEALTH POST INFO | HEALTH POST INFO | HEALTH POST INFO ///////////////

const requestHealthPost = (health) => {
  return {
    type: types.HEALTH_POST_REQUEST,
    payload: health
  }
};


const verifiedHealthPost = (health) =>{
  return {
      type: types.HEALTH_POST_SUCCESS,
      payload: health
    }
};

const failedHealthPost = (message) => {
  return {
    type: types.HEALTH_POST_FAILURE,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export const healthPost = (id, healthInfo) => {
  return (dispatch) => {
    dispatch(requestHealthPost(healthInfo));

    let healthInformation = {
      dob: healthInfo.dob,
      weight: healthInfo.weight,
      height: healthInfo.height,
      bloodType: healthInfo.bloodType
    };
    axios.post(`api/patient/healthinfo/${id}`, healthInformation).then(info =>{
      dispatch(verifiedHealthPost(info));
    })
    .catch(response => {
      dispatch(failedHealthPost(response));
    });
  }
}


///////////////EMERGENCY CONTACT INFO | EMERGENCY CONTACT INFO | EMERGENCY CONTACT INFO ///////////////

const requestEmergencyContact = (contact) => {
  return {
    type: types.EMERGENCY_CONTACT_REQUEST,
    payload: contact
  }
};


const verifiedEmergencyContact = (contact) =>{
  return {
      type: types.EMERGENCY_CONTACT_SUCCESS,
      payload: contact
    }
};

const failedEmergencyContact = (message) => {
  return {
    type: types.EMERGENCY_CONTACT_FAILURE,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export function emergencyContact(id, contact) {
console.log("IN ACTION")
  return {
      type: types.EMERGENCY_CONTACT_SUCCESS,
      payload: contact
    }
}


///////////////INSURANCE INFO | INSURANCE INFO | INSURANCE INFO ///////////////

const requestInsurancePost = (insurance) => {
  return {
    type: types.INSURANCE_POST_REQUEST,
    payload: insurance
  }
};


const verifiedInsurancePost = (insurance) =>{
  return {
      type: types.INSURANCE_POST_SUCCESS,
      payload: insurance
    }
};

const failedInsurancePost = (message) => {
  return {
    type: types.INSURANCE_POST_FAILURE,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export const insurancePost = (id, insurance) => {
  return (dispatch) => {
    dispatch(requestInsurancePost(insurance));

    let insurancePost = {
      id_patient: id,
      id_insurance_client: insurance.id,
      type: insurance.type,
      policy_number: insurance.policy
    };
    axios.post(`api/patient/insurance/${id}`, insurancePost).then(insured =>{
      dispatch(verifiedInsurancePost(insured));
    })
    .catch(response => {
      dispatch(failedInsurancePost(response));
    });
  }
}
