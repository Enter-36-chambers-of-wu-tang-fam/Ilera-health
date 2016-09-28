// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT

import axios from 'axios';
import { browserHistory } from 'react-router'
import * as types from './action-types';

/***********************SIGN IN && SIGN UP *****************************/

/////////////////HIGHER ORDER AUTHENTICATION///////////////////////
export function authenticateUser(){
 return function(dispatch){
  dispatch({
    type: types.AUTHENTICATE,
    payload: localStorage.getItem('uid'),
    userType: localStorage.getItem('userType')
  })
 }
}



/////////////////HIGHER ORDER AUTHENTICATION///////////////////////
export function getAppointments(){
 return function(dispatch){
  dispatch({
    type: types.SET_APPOINTMENT,
    payload: localStorage.getItem('uid'),
    userType: localStorage.getItem('userType')
  })
 }
}







//CAN DELETE THE ONES BELOW WHEN WE ARE DONE ^^ THESE ARE THE ONES IN CURRENT USE
////////////////LOGIN LOGIN LOGIN ///////////////

const requestLogin = (creds) => {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: creds
  }
};


const verifiedLogin = (creds) =>{
  return {
      type: types.LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      payload: creds
    }
};

const failedLogin = (message) => {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: message
  }
};

//Action call below for sign in 
//Type is either patient or physician

export const signIn = (user, userType) => {
  return (dispatch) => {
    dispatch(requestLogin(user));

    let credentials = {
      email: user.email,
      password: user.password
    };

    axios.post(`api/${userType}/signin`, credentials).then(verified =>{
      dispatch(verifiedLogin(verified))
    })
    .catch(response => {
      dispatch(failedLogin(response));
    });
  }
}


////////////////SIGN UP | SIGN UP | SIGN UP ///////////////

const requestSignUp = (creds) => {
  return {
    type: types.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: creds
  }
};


const verifiedSignUp = (creds) =>{
  return {
      type: types.SIGNUP_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      payload: creds
    }
};

const failedSignUp = (message) => {
  return {
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export const signUp = (user, userType) => {
  return (dispatch) => {
    dispatch(requestSignUp(user));

    let credentials = {
      first: user.first,
      last: user.last,
      email: user.email,
      password: user.password
    };
    axios.post(`api/${userType}/signup`, credentials).then(verified =>{
      dispatch(verifiedSignUp(verified))
    })
    .catch(response => {
      dispatch(failedSignUp(response));
    });
  }
}


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





////////////////lOGOUT | LOGOUT | LOGOUT///////////////


const requestLogout = () =>{
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

// Called upon successfull logout request, info sent to reducers.

const receiveLogout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}


const failedLogout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(requestLogout());
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
   
  // return function(dispatch) {
  //  console.log("HERE", id, contact)
  //   dispatch(requestEmergencyContact(contact));

  //   let emergencyContact = {
  //     first: contact.first,
  //     last: contact.last,
  //     phone: contact.phone,
  //     email: contact.email,
  //     relationship: contact.relationship
  //   };
  //   return axios.post(`api/patient/emergency_contacts/${id}`).then(contact =>{
  //       dispatch(verifiedEmergencyContact(contact));
  //       browserHistory.push('/provider/insurance');
  //     })
  //     .catch(response => {
  //       console.log("ERRROORRRR")
  //       dispatch(failedEmergencyContact(response));
  //     });
    
  // }
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