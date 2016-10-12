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


const getUserInfoSuccess = (user, contacts) =>{
  return {
      type: types.GET_USER_INFO_SUCCESS,
      user: user,
      contacts: contacts
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
  return (dispatch) => {
    dispatch(getUserInfoRequest());

    axios.get(`/api/patient/${uid}`)
    .then( user => {
      console.log("USER", user)
      localStorage.setItem("photo", user.data[0].photo_path);

      dispatch(getUserInfoSuccess(user.data[0]))
    })
    .catch(err => {
      // dispatch(getUserInfoFailed(err));
    });
  }
};


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

///////////////// USER CONTACTS ///////////////
const getUserContactsRequest = () => {
  return {
    type: types.GET_USER_CONTACTS_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getUserContactsSuccess = (contacts) =>{
  return {
      type: types.GET_USER_CONTACTS_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: contacts
    }
};

const getUserContactsFailed = (err) => {
  return {
    type: types.GET_USER_CONTACTS_FAILURE,
    payload: err
  }
};

export function getUserContacts(uid) {
  return (dispatch) => {
    dispatch(getUserContactsRequest());

    axios.get(`/api/patient/contacts/${uid}`)
    .then( user => {
      console.log("CONTACTS", user.data)
    
      dispatch(getUserContactsSuccess(user.data))
    })
    .catch(err => {
      dispatch(getUserContactsFailed(err));
    });
  }
}

///////////// FORM INIT //////////////////

const didInitSuccess = () => {
  return {
    type: types.DID_INIT,
    payload: true
  }
};

export function didInit () {
  return (dispatch) => {
    dispatch(didInitSuccess());
  }
}

/////////// GET ALL ////////////
export function getAllUserInfo(uid) {
  console.log("****UID***", uid)
  return (dispatch) => {
    dispatch(getUserInfoRequest());

    axios.get(`/api/patient/${uid}`)
    .then( user => {
      axios.get(`/api/patient/contacts/${uid}`)
      .then( contacts => {
        console.log("LAKJDFLKJASDF", user.data, contacts)
        dispatch(getUserInfoSuccess(user.data[0], contacts))
      })

      
    })
    .catch(err => {
      // dispatch(getUserInfoFailed(err));
    });
  }
};

///////////////// PROVIDER INFO ///////////////
const getProviderRequest = () => {
  return {
    type: types.GET_PROVIDER_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getProviderSuccess = (user) =>{
  return {
      type: types.GET_PROVIDER_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: user
    }
};

const getProviderFailed = (err) => {
  return {
    type: types.GET_PROVIDER_FAILURE,
    payload: err
  }
};

export function getProvider(uid) {
  return (dispatch) => {
    dispatch(getProviderRequest());

    axios.get(`/api/physician/${uid}`)
    .then( user => {    
      console.log("HERE DUDE", user.data)
      dispatch(getProviderSuccess(user.data[0]))
    })
    .catch(err => {
      console.log("AND HERE DUDE")
      dispatch(getProviderFailed(err));
    });
  }
}
