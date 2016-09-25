import axios from 'axios';
import * as types from './action-types';

const addMessageRequest = (message) => {
	return {
		type:  types.MESSAGE_ADD_REQUEST,
		isFetching: true,
		payload: message
	}
}

const addMessage = (message) => {
	return {
		type: types.MESSAGE_ADD_SUCCESS,
		isFetching: false,
		payload: message
	}
}

const addMessageFailed = (err) => {
	return {
		type: types.MESSAGE_ADD_FAILURE,
		isFetching: false,
		payload: err
	}
}

export function createMessage(message) {
	console.log("YAAAAAAY")
  return dispatch => {
    dispatch(addMessageRequest(message))
    return axios.post('/api/newmessage', message)
			.then( success => {
					dispatch(addMessage(message));
			})
			.catch( err => {
					dispatch(addMessageFailed(err));
			})
  }
}