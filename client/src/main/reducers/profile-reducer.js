// import {
//   INITIALIZE_BASIC, INITIALIZE
// } from '../../patients/actions/action-constants.js';

// const initialState = {
//   isFetching: false,
//   loaded: false,
//   appointment: {},
//   healthLog: {},
//   insurance: {},
//   medication: {},
//   patient: {},
//   provider: {}
// };

// export default function userInfoReducer(state = initialState, action) {
// 	console.log(action.type)
//   switch (action.type) {
//     case INITIALIZE:
// 		console.log("INITIALIZE", action.payload, action.type)
// 			return { 
// 					...state, 
// 					patient: action.payload
// 			}
//     default:
//       return {...state};
//   }
// };