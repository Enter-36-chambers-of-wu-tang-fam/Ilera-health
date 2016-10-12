// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT
import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as types from './action-constants';

/***********************SIGN IN && SIGN UP *****************************/
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
    message: message
  };
};

export function authenticateUser( userType,data,reqType ) {
  if(reqType === "login"){
    return dispatch => {
      dispatch( requestAuth(null) );
      axios.post(`/api/${userType}/signin`, data)
        .then( found => {
          if(userType === 'patient'){
            var encodedId = CryptoJS.AES.encrypt( String(found.data.id), 'key' ); //need to change key
            localStorage.setItem( 'first', found.data.first );
            localStorage.setItem( 'last', found.data.last );
            localStorage.setItem( 'photo', found.data.photo_path );
          } else if( userType === 'physician' ) {
            var encodedId = CryptoJS.AES.encrypt(String(found.data.id), 'key'); //need to change key
            localStorage.setItem( 'first', found.data.first );
            localStorage.setItem( 'last', found.data.last );
            localStorage.setItem( 'photo', found.data.photo_path );
          } else {
            var encodedId = CryptoJS.AES.encrypt(String(found.data.id), 'key'); //need to change key
            localStorage.setItem( 'first', found.data.first );
            localStorage.setItem( 'last', found.data.last );
            localStorage.setItem( 'photo', found.data.photo_path );
          }
            localStorage.setItem( 'uid',encodedId);
            localStorage.setItem( 'userType',userType);
          dispatch( verifiedAuth(encodedId,userType,false) ); //false -> reroutes to dashboard in place of signup via general_auth component
        })
        .catch( err => dispatch( failedAuth(err)) )
    }
  }
  if(reqType === "signup"){
    return dispatch => {
      dispatch( requestAuth(data) );
      axios.post(`/api/${userType}/signup`, data)
      .then(registered => {
        let encodedId = CryptoJS.AES.encrypt( String(registered.data.user), 'key');  //need to change key to actual key
        localStorage.setItem( 'uid',encodedId );
        localStorage.setItem( 'userType',userType );
        localStorage.setItem( 'first', registered.data.first );
        localStorage.setItem( 'last', registered.data.last );
        dispatch( verifiedAuth(encodedId, userType, true) ); //true --> reroutes to sign up form via general_auth component
      })
      .catch( error => failedAuth(error) );
    }
  }
  if(reqType === "logout"){
    return dispatch => {
      dispatch( requestAuth(null) );
      axios.post(`/api/${userType}/logout/`).then( loggedout => {
          localStorage.clear();
          dispatch( verifiedAuth(null,null,false) );
      })
      .catch( error => dispatch( failedAuth(error)) );
    };
  };
};