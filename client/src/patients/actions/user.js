import axios from 'axios';
import * as types from './action-constants';

/////////////// GET ALL USER INFO //////////////////

const getUserInfoRequest = () => {
  return {
    type: types.GET_USER_INFO_REQUEST,
    isFetching: true,
    loaded: false
  };
};

const getUserInfoSuccess = ( user, contacts ) =>{
  return {
    type: types.GET_USER_INFO_SUCCESS,
    user: user,
    contacts: contacts
  };
};

const getUserInfoFailed = ( err ) => {
  return {
    type: types.GET_USER_INFO_FAILURE,
    payload: err
  };
};

//Action call below for sign up --> uncomment export default
export function getUserInfo( uid ) {
  return dispatch => {
    dispatch( getUserInfoRequest() );
    axios.get(`/api/patient/${uid}`)
    .then( user => {
      localStorage.setItem("photo", user.data[0].photo_path);
      dispatch( getUserInfoSuccess(user.data[0]) );
    })
    .catch(err => {
      // dispatch(getUserInfoFailed(err));
    });
  };
};

const getUserInsuranceRequest = () => {
  return {
    type: types.GET_USER_INSURANCE_REQUEST,
    isFetching: true,
    loaded: false
  };
};

const getUserInsuranceSuccess = ( user ) =>{
  return {
    type: types.GET_USER_INSURANCE_SUCCESS,
    isFetching: false,
    loaded: true,
    payload: user
  };
};

const getUserInsuranceFailed = ( err ) => {
  return {
    type: types.GET_USER_INSURANCE_FAILURE,
    payload: err
  };
};

export function getUserInsurance( uid ) {
  return dispatch => {
    dispatch( getUserInsuranceRequest() );
    axios.get(`/api/patient/insurance/${uid}`)
    .then( user => {    
      dispatch( getUserInsuranceSuccess(user.data) );
    })
    .catch( err => {
      dispatch( getUserInsuranceFailed(err) );
    });
  }
}

///////////////// USER REMINDERS //////////////////
const getUserRemindersRequest = () => {
  return {
    type: types.GET_ALL_USER_REMINDERS_REQUEST,
    isFetching: true,
    loaded: false
  };
};

const getUserRemindersSuccess = ( reminders ) =>{
  return {
    type: types.GET_ALL_USER_REMINDERS_SUCCESS,
    isFetching: false,
    loaded: true,
    payload: reminders
  };
};

const getUserRemindersFailed = ( err ) => {
  return {
    type: types.GET_ALL_USER_REMINDERS_FAILURE,
    payload: err
  };
};

export function getUserReminders( uid ) {
  return dispatch => {
    dispatch( getUserRemindersRequest() );
    axios.get(`/api/patient/getappointments/${uid}`)
    .then( reminders => {
      dispatch( getUserRemindersSuccess(reminders.data) );
    })
    .catch( err => {
      dispatch( getUserRemindersFailed(err) );
    });
  };
};

///////////////// USER CONTACTS ///////////////
const getUserContactsRequest = () => {
  return {
    type: types.GET_USER_CONTACTS_REQUEST,
    isFetching: true,
    loaded: false
  };
};

const getUserContactsSuccess = ( contacts ) =>{
  return {
    type: types.GET_USER_CONTACTS_SUCCESS,
    isFetching: false,
    loaded: true,
    payload: contacts
  };
};

const getUserContactsFailed = ( err ) => {
  return {
    type: types.GET_USER_CONTACTS_FAILURE,
    payload: err
  };
};

export function getUserContacts( uid ) {
  return dispatch => {
    dispatch( getUserContactsRequest() );
    axios.get(`/api/patient/contacts/${uid}`)
    .then( user => {
      dispatch( getUserContactsSuccess(user.data) );
    })
    .catch( err => {
      dispatch( getUserContactsFailed(err) );
    });
  };
};

///////////// FORM INIT //////////////////
const didInitSuccess = () => {
  return {
    type: types.DID_INIT,
    payload: true
  };
};

export function didInit() {
  return dispatch => {
    dispatch(didInitSuccess());
  };
};

/////////// GET ALL ////////////
export function getAllUserInfo( uid ) {
  return dispatch => {
    dispatch( getUserInfoRequest() );
    axios.get(`/api/patient/${uid}`)
    .then( user => {
      axios.get(`/api/patient/contacts/${uid}`)
      .then( contacts => {
        dispatch( getUserInfoSuccess(user.data[0], contacts) );
      });
    })
    .catch(err => {
      // dispatch(getUserInfoFailed(err));
    });
  };
};