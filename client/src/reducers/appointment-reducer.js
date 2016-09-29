import * as types from '../actions/action-types.js';

const appointment = {

  userAppt: function(state={}, action){
            switch(action.type) {
              case types.SET_APPOINTMENT:
              return Object.assign({},state, {
                  appointmentSet: action.payload,
                  userType: action.userType
              })
              case 'ALL_PHYSICIAN_APPOINTMENTS':
              return Object.assign({},state, {
                  appointmentSet: action.payload,
                  userType: action.userType
              })
            }
            return state;
          },

  physAppt: function(state={}, action){
            console.log("PHYSICIAN APPOINTMENTS", state);
            switch(action.type) {
              case 'ALL_PHYSICIAN_APPOINTMENTS':
              return Object.assign({},state, {
                  setAppointments: action.payload,
              })
            }
            return state;
          }
} 

export default appointment;
