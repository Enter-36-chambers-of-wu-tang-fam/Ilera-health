// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT

import axios from 'axios';
import CryptoJS from 'crypto-js';
import { browserHistory } from 'react-router'
import * as types from './action-types';

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

export function authenticateUser(userType,data,reqType,cb){
  if(reqType === "login"){
    return function(dispatch){
      dispatch(requestAuth(null));
      axios.post(`/api/${userType}/signin`, data)  
        .then( found => {
          let encodedId = CryptoJS.AES.encrypt(String(found.data), 'key');
          localStorage.setItem('uid',encodedId);          
          localStorage.setItem('userType',userType);
          dispatch(verifiedAuth(encodedId,userType,false));
          //this.context.router.push(`${this.state.userType}/dashboard`); //The higher order component automatically reroutes
        })
        .catch( err => dispatch(failedAuth(err)) )
    }
  }
  if(reqType === "signup"){
    return function(dispatch){
      dispatch(requestAuth(data));
      axios.post(`/api/${userType}/signup`, data)
      .then(registered => {
        //storeFormInfo("test", registered)    
        console.log(registered.data.user);
        let encodedId = CryptoJS.AES.encrypt(String(registered.data.user), 'key');  //need to change key to actual key
        localStorage.setItem('uid',encodedId);
        localStorage.setItem('userType',userType);
        dispatch(verifiedAuth(encodedId, userType, true)); //Not using sign up to keep authentication streamlined
        if(this.state.userType === 'patient') this.context.router.push('/patient/form');
        else this.context.router.push('provider/');
        cb(registered);
      })
      .catch(error => failedAuth(error))
    }
  }
}






//CAN DELETE THE ONES BELOW WHEN WE ARE DONE ^^ THESE ARE THE ONES IN CURRENT USE



////////////////SIGN UP | SIGN UP | SIGN UP ///////////////

const requestSignUp = (creds) => {
  return {
    type: types.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: creds
  }
};


// const verifiedSignUp = (creds) =>{
//   return {
//       type: types.SIGNUP_SUCCESS,
//       isFetching: false,
//       isAuthenticated: true,
//       payload: creds
//     }
// };

const failedSignUp = (message) => {
  return {
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: message
  }
};

//Action call below for sign up --> uncomment export default

export const signUp = (userType, data, cb) => {
  return function(dispatch){
    console.log(userType, data)
    dispatch(requestSignUp(data));
    axios.post(`/api/${userType}/signup`, data)
    .then( registered => {
      console.log('REGISTERED', registered.data.user);
      cb(registered);  //storeFormInfo("test", registered)    
      let encodedId = CryptoJS.AES.encrypt(String(registered.data.user), 'key');  //need to change key to actual key
      localStorage.setItem('uid',encodedId);
      localStorage.setItem('userType',userType);
      dispatch(verifiedLogin(encodedId, userType)); //Not using sign up to keep authentication streamlined

    })
    .catch( err => failedSignUp(err))
}


  // return (dispatch) => {
  //   dispatch(requestSignUp(user));

  //   let credentials = {
  //     first: user.first,
  //     last: user.last,
  //     email: user.email,
  //     password: user.password
  //   };
  //   axios.post(`api/${userType}/signup`, credentials).then(verified =>{
  //     dispatch(verifiedSignUp(verified))
  //   })
  //   .catch(response => {
  //     dispatch(failedSignUp(response));
  //   });
  // }
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
    loggedOut: false,
  }
}

// Called upon successfull logout request, info sent to reducers.
const verifiedLogout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    loggedOut: true,
  }
}


const failedLogout = (message) => {
  return {
    type: types.LOGOUT_FAILURE,
    isFetching: false,
    loggedOut: false,
    message: message
  }
}

export const logOut = (userType) => {
  return (dispatch) =>{
    dispatch(requestLogout());
    axios.post(`/api/${userType}/logout/`).then(loggedout => {
        dispatch(verifiedLogout());
    })
    .catch(error => {
      dispatch(failedLogout(error));
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