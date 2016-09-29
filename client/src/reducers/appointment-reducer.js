import * as types from '../actions/action-types.js';

const appointment = {

  setAppt: function(state={}, action){
            switch(action.type) {
              case types.SET_APPOINTMENT_REQUEST:
                return Object.assign({},state, {
                  appointmenSet: action.payload,
                  isPosted: action.isPosted
                })

              case types.SET_APPOINTMENT_SUCCESS:
                return Object.assign({},state, {
                  appointmentSet: action.payload,
                  userType: action.isPosted
                })
              
              case types.SET_APPOINTMENT_FAILURE:
                return Object.assign({},state, {
                  appointmentSet: action.payload,
                  isPosted: action.isPosted
                })
              default:
                return state;
              }
          },


  physAppt: function(state={}, action){
            switch(action.type) {
              case types.ALL_PHYSICIAN_APPOINTMENTS_REQUEST:
                return Object.assign({},state, {
                  setAppointments: action.payload,
                  retrieved: action.retrieved
                })

              case types.ALL_PHYSICIAN_APPOINTMENTS_SUCCESS:
                return Object.assign({},state, {
                  setAppointments: action.payload,
                  retrieved: action.retrieved
                })

              case types.ALL_PHYSICIAN_APPOINTMENTS_FAILURE:
                return Object.assign({},state, {
                  setAppointments: action.payload,
                  retrieved: action.retrieved
                })
              default:
                return state;
              }
            }

}
 

export default appointment;

