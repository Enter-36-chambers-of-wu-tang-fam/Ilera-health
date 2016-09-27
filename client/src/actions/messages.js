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

export function createMessage(message, sender_id, receiver_id) {
	console.log("YAAAAAAY")
  return dispatch => {
    dispatch(addMessageRequest(message))
    return axios.post('/api/messages/newmessage', {direct_message: message, sender_id: sender_id, receiver_id: receiver_id})
			.then( success => {
					dispatch(addMessage(message));
			})
			.catch( err => {
					dispatch(addMessageFailed(err));
			})
  }
}

const fetchMessagesRequest = () => {
	return {
		type:  types.MESSAGE_FETCH_REQUEST,
		isFetching: true,
	}
}

const fetchMessagesSuccess = (message) => {
	return {
		type:  types.MESSAGE_FETCH_SUCCESS,
		isFetching: false,
		payload: message
	}
}

const fetchMessagesFailure = (err) => {
	return {
		type:  types.MESSAGE_FETCH_FAILURE,
		isFetching: false,
		payload: err
	}
}

export function fetchMessages(receiverId, senderId) {
  console.log("FETCH MESSAGES")
  return dispatch => {
    dispatch(fetchMessagesRequest())
    return axios.post(`/api/messages/fetch`, {receiver_id: receiverid, sender_id: senderid})
      .then(response =>{
		dispatch(fetchMessagesSuccess(response));	  
	  })
      .catch(error => {
		  dispatch(fetchMessagesFailure(error));
	  });
  }
}