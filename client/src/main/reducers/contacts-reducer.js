import {
<<<<<<< dbc80250cdb466fd2c4c43c183a1186c695b7b8e
  PATIENT_FETCH_PHYSICIANS, PATIENT_FETCH_PHYSICIANS_FAILURE, PHYSICIAN_FETCH_PATIENTS, PHYSICIAN_FETCH_PATIENTS_FAILURE
=======
  PATIENT_FETCH_PHYSICIANS, PATIENT_FETCH_PHYSICIANS_FAILURE,
  PHYSICIAN_FETCH_PATIENTS, PHYSICIAN_FETCH_PATIENTS_FAILURE,
  MAKE_MY_PHYSICIAN_REQUEST, MAKE_MY_PHYSICIAN_SUCCESS, MAKE_MY_PHYSICIAN_FAILURE,
  REMOVE_RELATIONSHIP_REQUEST, REMOVE_RELATIONSHIP_SUCCESS, REMOVE_RELATIONSHIP_FAILURE
>>>>>>> final updates
} from '../../patients/actions/action-constants.js';


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