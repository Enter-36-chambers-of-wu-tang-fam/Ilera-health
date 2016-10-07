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
  console.log("****UID***", uid)
  return (dispatch) => {
    dispatch(getUserInfoRequest());

    axios.get(`/api/patient/${uid}`)
    .then( user => {
      console.log("USER", user)

      dispatch(getUserInfoSuccess(user.data[0]))
    })
    .catch(err => {
      dispatch(getUserInfoFailed(err));
    });
  }
};

const getUserInsuranceRequest = () => {
  return {
    type: types.GET_USER_INSURANCE_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getUserInsuranceSuccess = (user) =>{
  return {
      type: types.GET_USER_INSURANCE_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: user
    }
};

const getUserInsuranceFailed = (err) => {
  return {
    type: types.GET_USER_INSURANCE_FAILURE,
    payload: err
  }
};

export function getUserInsurance(uid) {
  return (dispatch) => {
    dispatch(getUserInsuranceRequest());

    axios.get(`/api/patient/insurance/${uid}`)
    .then( user => {
      console.log("USER", user.data)
    
      dispatch(getUserInsuranceSuccess(user.data))
    })
    .catch(err => {
      dispatch(getUserInsuranceFailed(err));
    });
  }
}


///////////////// USER REMINDERS //////////////////
const getUserRemindersRequest = () => {
  return {
    type: types.GET_ALL_USER_REMINDERS_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getUserRemindersSuccess = (reminders) =>{
  return {
      type: types.GET_ALL_USER_REMINDERS_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: reminders
    }
};

const getUserRemindersFailed = (err) => {
  return {
    type: types.GET_ALL_USER_REMINDERS_FAILURE,
    payload: err
  }
};

export function getUserReminders(uid) {
  return (dispatch) => {
    dispatch(getUserRemindersRequest());

    axios.get(`/api/patient/getappointments/${uid}`)
    .then( reminders => {
      console.log("REMINDERS", reminders.data)
    
      dispatch(getUserRemindersSuccess(reminders.data))
    })
    .catch(err => {
      dispatch(getUserRemindersFailed(err));
    });
  }
}
