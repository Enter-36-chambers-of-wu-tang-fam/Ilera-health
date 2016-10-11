import * as types from '../../patients/actions/action-constants.js';

const appointment = {

  setAppt: (state={}, action) =>{
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
              
              case types.UPDATE_APPOINTMENT_REQUEST:
                return Object.assign({},state, {
                  appointmenUpdate: action.payload,
                  isPosted: action.isPosted
                })

              case types.UPDATE_APPOINTMENT_SUCCESS:
                return Object.assign({},state, {
                  appointmentUpdate: action.payload,
                  userType: action.isPosted
                })
              
              case types.UPDATE_APPOINTMENT_FAILURE:
                return Object.assign({},state, {
                  appointmentUpdate: action.payload,
                  isPosted: action.isPosted
                })
              default:
                return state;
              }
          },


  physAppt: (state={}, action)=>{
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

