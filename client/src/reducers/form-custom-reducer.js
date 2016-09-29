import {
  FORM_SUBMITTED
} from '../actions/action-types.js';

const initialState = {
  forms: {}
};
console.log("1 FORM_SUBMITTED");

export default function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_SUBMITTED:
        console.log("2 FORM_SUBMITTED", action.formName, action.payload);
        return { ...state, forms: { formName: action.formName, fields: action.payload} }
    default:
      return state;
  }
};