import { SET_APPOINTMENT_REQUEST, SET_APPOINTMENT_SUCCESS, SET_APPOINTMENT_FAILURE,
UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE,
ALL_PHYSICIAN_APPOINTMENTS_REQUEST, ALL_PHYSICIAN_APPOINTMENTS_SUCCESS, ALL_PHYSICIAN_APPOINTMENTS_FAILURE
} from '../../patients/actions/action-constants.js';

import {ALL_PHYSICIAN_APPOINTMENTS_PATIENTS_INFO_SUCCESS} from '../../physicians/actions/action-constants.js';

const appointment = {

  setAppt: (state={}, action) =>{
            switch(action.type) {
              case SET_APPOINTMENT_REQUEST:
                return { ...state, appointmenSet: action.payload, isPosted: action.isPosted }
              case SET_APPOINTMENT_SUCCESS:
                return { ...state, appointmenSet: action.payload, userType: action.isPosted }
              case SET_APPOINTMENT_FAILURE:
                return { ...state, appointmenSet: action.payload, isPosted: action.isPosted }             
              case UPDATE_APPOINTMENT_REQUEST:
                 return { ...state, appointmenUpdate: action.payload, isPosted: action.isPosted }
              case UPDATE_APPOINTMENT_SUCCESS:
                return { ...state, appointmenUpdate: action.payload, userType: action.isPosted }             
              case UPDATE_APPOINTMENT_FAILURE:
                return { ...state, appointmenUpdate: action.payload, isPosted: action.isPosted }           
              default:
                return state;
            }
          },

  physAppt: (state={}, action)=>{
            switch(action.type) {
              case ALL_PHYSICIAN_APPOINTMENTS_REQUEST:
                return { ...state, setAppointments: action.payload, retrieved: action.retrieved }
              case ALL_PHYSICIAN_APPOINTMENTS_SUCCESS:
                return { ...state, setAppointments: action.payload, retrieved: action.retrieved }
              case ALL_PHYSICIAN_APPOINTMENTS_FAILURE:
                return { ...state, setAppointments: action.payload, retrieved: action.retrieved }           
              default:
                return state;
              }
            },

  patientInfo: (state={}, action) => {
                switch(action.type) {
                  case ALL_PHYSICIAN_APPOINTMENTS_PATIENTS_INFO_SUCCESS:
                    return { ...state, info: action.payload }
                  default:
                    return state;
                }
              }

}


export default appointment;
