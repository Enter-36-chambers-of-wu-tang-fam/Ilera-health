import axios from 'axios';
import {SET_APPOINTMENT_REQUEST, SET_APPOINTMENT_SUCCESS, SET_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE,
ALL_PHYSICIAN_APPOINTMENTS_REQUEST, ALL_PHYSICIAN_APPOINTMENTS_SUCCESS, ALL_PHYSICIAN_APPOINTMENTS_FAILURE,
} from './action-constants';

/* SET APPOINTMENT ACTIONS */

const setAppointmentRequest = (appt) => {
  return {
    type: SET_APPOINTMENT_REQUEST,
    payload:appt,
    isPosted: false
  }
};

const setAppointmentSuccess = (setAppt) => {
  return {
    type: SET_APPOINTMENT_SUCCESS,
    payload: setAppt,
    isPosted: true
  }
};

const setAppointmentFailure = (errorMsg) => {
  return {
    type: SET_APPOINTMENT_FAILURE,
    payload: errorMsg,
    isPosted: false
  }
};


export const setAppointment = (appt) => {
  return function(dispatch){
    dispatch(setAppointmentRequest(appt));
    axios.post('/api/patient/setappointment', appt)
      .then(setDate => {
        dispatch(setAppointmentSuccess(setDate));
      })
      .catch(error => dispatch(setAppointmentFailure(error)))
  }
}

/* UPDATE APPOINTMENT ACTIONS */

const updateAppointmentRequest = (appt) => {
  return {
    type: UPDATE_APPOINTMENT_REQUEST,
    payload:appt,
    isPosted: false
  }
};

const updateAppointmentSuccess = (setAppt) => {
  return {
    type: UPDATE_APPOINTMENT_SUCCESS,
    payload: setAppt,
    isPosted: true
  }
};

const updateAppointmentFailure = (errorMsg) => {
  return {
    type: UPDATE_APPOINTMENT_FAILURE,
    payload: errorMsg,
    isPosted: false
  }
};


export const updateAppointment = (appt) => {
  return function(dispatch){
    dispatch(updateAppointmentRequest(appt));
    axios.put('/api/update/appointment', appt)
      .then(setDate => {
        dispatch(updateAppointmentSuccess(setDate));
      })
      .catch(error => dispatch(updateAppointmentFailure(error)))
  }
}




/* GET ALL PHYSICIAN CURRENT BOOKINGS */

const getAllPhysicianApptsRequest = (physician) => {
  return {
    type: ALL_PHYSICIAN_APPOINTMENTS_REQUEST,
    payload:physician,
    retrieved: false
  }
};

const getAllPhysicianApptsSuccess = (dates) => {
  return {
    type: ALL_PHYSICIAN_APPOINTMENTS_SUCCESS,
    payload: dates,
    retrieved: true
  }
};

const getAllPhysicianApptsFailure = (errorMsg) => {
  return {
    type: ALL_PHYSICIAN_APPOINTMENTS_FAILURE,
    payload: errorMsg,
    retrieved: false
  }
};

export const getAllPhysicianAppts = (physid) => {
  let currAppts = {};
  axios.get(`/api/patient/getappointment/${physid}`).then( dates => {
    dates.data.forEach(item => {
      let date = item.date.slice(0,10);
      if(currAppts[date]) currAppts[date][item.time] = true;
      else {
        currAppts[date] = {};
        currAppts[date][item.time] = true;
      }
    })
  })
  .catch(err => console.log(err) );

  return getAllPhysicianApptsSuccess(currAppts);
}
