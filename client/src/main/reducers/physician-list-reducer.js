 import { FETCH_PHYSICIANS } from '../../patients/actions/action-constants.js';

export default function(state = [], action){
  switch (action.type){
    case FETCH_PHYSICIANS :
      return [action.payload.data, state]
  }
  return state;
}
