import {
  PATIENT_FETCH_PHYSICIANS, PATIENT_FETCH_PHYSICIANS_FAILURE, PHYSICIAN_FETCH_PATIENTS, PHYSICIAN_FETCH_PATIENTS_FAILURE
} from '../actions/action-types.js';

const initialState = {
  isFetching: false,
  loaded: false,
  contacts: [],
  fetchHistory: []
};

export default function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case PATIENT_FETCH_PHYSICIANS:
        console.log("PATIENT_FETCH_PHYSICIANS");
        return { ...state, loaded: true, contacts: action.payload }
    case PATIENT_FETCH_PHYSICIANS_FAILURE:
        console.log("PATIENT_FETCH_PHYSICIANS_FAILURE");
        return { ...state, loaded: false }
    case PHYSICIAN_FETCH_PATIENTS:
        console.log("PHYSICIAN_FETCH_PATIENTS");
        return { ...state, loaded: true, contacts: action.payload }
    case PHYSICIAN_FETCH_PATIENTS_FAILURE:
        console.log("PHYSICIAN_FETCH_PATIENTS_FAILURE");
        return { ...state, loaded: false }
    default:
      return state;
  }
};