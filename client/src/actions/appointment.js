import axios from 'axios';
import * as types from './action-types.js';

/* SET APPOINTMENT ACTIONS */

const setAppointmentRequest = (appt) => {
  return {
    type: types.SET_APPOINTMENT_REQUEST,
    payload:appt,
    isPosted: false
  }
};

const setAppointmentSuccess = (setAppt) => {
  return {
    type: types.SET_APPOINTMENT_SUCCESS,
    payload: setAppt,
    isPosted: true
  }
};

const setAppointmentFailure = (errorMsg) => {
  return {
    type: types.SET_APPOINTMENT_FAILURE,
    payload: errorMsg,
    isPosted: false
  }
};


export const setAppointment = (appt) => {
  return function(dispatch){
    dispatch(setAppointmentSuccess(appt));
    axios.post('/api/patient/setappointment', appt)
      .then(setDate => {
        dispatch(setAppointmentSuccess(setDate));
      })
      .catch(error => dispatch(setAppointmentFailure(error))) 
  }
}


/* GET ALL PHYSICIAN CURRENT BOOKINGS */

const getAllPhysicianApptsRequest = (physician) => {
  return {
    type: types.ALL_PHYSICIAN_APPOINTMENTS_REQUEST,
    payload:physician,
    retrieved: false
  }
};

const getAllPhysicianApptsSuccess = (dates) => {
  return {
    type: types.ALL_PHYSICIAN_APPOINTMENTS_SUCCESS,
    payload: dates,
    retrieved: true
  }
};

const getAllPhysicianApptsFailure = (errorMsg) => {
  return {
    type: types.ALL_PHYSICIAN_APPOINTMENTS_FAILURE,
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




