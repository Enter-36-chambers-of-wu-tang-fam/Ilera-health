import * as types from '../../patients/actions/action-constants.js';

const initialState = {
  isFetching: false,
  loaded: false,
  medication: [],
  fetchHistory: [],
  chosenMed: []
};

export default function medsReducer(state = initialState, action){
  switch (action.type) {
    case types.MEDS_FETCH_REQUEST:
      return { ...state, isFetching: true, loaded: false }
    case types.MEDS_FETCH_SUCCESS:
      return { ...state, loaded: true, medication: action.payload }
    case types.MEDS_FETCH_FAILURE:
      return { ...state, loaded: false }
    case types.MED_CHOSEN:
      return { ...state, chosenMed: action.payload}
    default:
      return state;
  }
};

// export default function chosenMeds(state = initialState, action)
