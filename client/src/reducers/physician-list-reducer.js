 import { FETCH_PHYSICIANS } from '../actions/action-types';

export default function(state = [], action){
  switch (action.type){
    case FETCH_PHYSICIANS :
      return [action.payload.data, state]
  }
  return state;
}
