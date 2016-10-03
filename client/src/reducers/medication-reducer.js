import * as types from '../actions/action-types.js';

const initialState = {
  isFetching: false,
  loaded: false,
  medication: [],
  fetchHistory: []
};

export default function medsReducer(state = initialState, action){
  switch (action.type) {
    case types.MEDS_FETCH_REQUEST:
      console.log('MEDS_FETCH_REQUEST');
      return { ...state, isFetching: true, loaded: false }
    case types.MEDS_FETCH_SUCCESS:
      console.log('MEDS_FETCH_SUCCESS')
      return { ...state, loaded: true, medication: action.payload }
    case types.MEDS_FETCH_FAILURE:
      console.log('MEDS_FETCH_FAILURE')
      return { ...state, loaded: false }
    default:
      return state;
  }
};
