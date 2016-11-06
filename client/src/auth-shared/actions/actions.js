// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { browserHistory } from 'react-router'

// Need to make updates to server upload routing as JWT is currently negatively impacting uploads

// import setAuthorizationToken from '../../../utils/setAuthorizationToken.js'
// import jwt from 'jsonwebtoken';
import * as types from './action-constants';

////////////////////////// SIGN IN && SIGN UP /////////////////////////////////
const requestAuth = ( creds ) => {
	return {
  	type: types.AUTH_REQUEST,
  	payload: creds,
  	userType: null
  };
};

const verifiedAuth = ( user,userType, signUp ) => {
  return {
    type: types.AUTH_SUCCESS,
    payload: user,
    userType: userType,
    signUp: signUp
  };
};

const failedAuth = ( message ) => {
  return {
    type: types.AUTH_FAILURE,
    payload: null,
    userType: null,
    message: "Your email and/or password was not correct. please try again"
  }
};

export function authenticateUser( userType,data,reqType ) {
  if(reqType === "login"){
    return dispatch => {
      dispatch( requestAuth(null) );
      axios.post(`/api/${userType}/signin`, data)
        .then( found => {
					
					//Reinstate once server side upload is fixed

          // const token = found.data.id;
          // localStorage.setItem("jwtToken", token);
          // setAuthorizationToken(token);

          var encodedId = CryptoJS.AES.encrypt(String(found.data.id), 'key'); //need to change key t
          
          localStorage.setItem('first', found.data.first);
          localStorage.setItem('last', found.data.last);
          localStorage.setItem('photo', found.data.photo_path);
          localStorage.setItem('uid',encodedId);
          localStorage.setItem('userType',userType);
          dispatch(verifiedAuth(encodedId,userType,false)); //false -> reroutes to dashboard in place of signup via general_auth component
        })
        .catch( err => dispatch( failedAuth(err)) )
    }
  }

  if(reqType === "signup"){
    return dispatch => {
      dispatch( requestAuth(data) );
      axios.post(`/api/${userType}/signup`, data)
      .then(registered => {

				//Reinstate once server side upload is fixed
				
        // const token = registered.data.id;
        // localStorage.setItem("jwtToken", token);
        // setAuthorizationToken(token);

        let encodedId = CryptoJS.AES.encrypt(String(registered.data.id), 'key');  //need to change key to actual key
        
        localStorage.setItem('first', registered.data.first);
        localStorage.setItem('last', registered.data.last);        
        localStorage.setItem('uid',encodedId);
        localStorage.setItem('userType',userType);
        dispatch(verifiedAuth(encodedId, userType, true)); //true --> reroutes to sign up form via general_auth component
      })
      .catch( error => failedAuth(error) );
    }
  }
  
  if(reqType === "logout"){
    return dispatch => {
      dispatch( requestAuth(null) );
      axios.post(`/api/${userType}/logout/`).then( loggedout => {
          localStorage.clear();
          setAuthorizationToken(false);
          dispatch(verifiedAuth(null,null,false));
      })
      .catch(error => dispatch(failedAuth(error)));
    }
  }
};