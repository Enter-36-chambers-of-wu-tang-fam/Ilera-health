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
		type: types.MESSAGE_FETCH_REQUEST,
		isFetching: true,
	}
}

const fetchMessagesSuccess = (messages) => {
	return {
		type: types.MESSAGE_FETCH_SUCCESS,
		isFetching: false,
		payload: messages
	}
}

const fetchMessagesFailure = (err) => {
	return {
		type: types.MESSAGE_FETCH_FAILURE,
		isFetching: false,
		payload: err
	}
}

export function fetchMessages(userid) {
  console.log("FETCH MESSAGES")
  return dispatch => {
    dispatch(fetchMessagesRequest())
    return axios.get(`/api/messages/fetch/${userid}`)
      .then(response =>{
				console.log("RESPONSE", response)
				dispatch(fetchMessagesSuccess(response));	  
	  })
      .catch(error => {
		  dispatch(fetchMessagesFailure(error));
	  });
  }
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    payload: message
  };
}

export function fetchMyPhysicians(userid) {
  console.log("FETCH MY PHYSICIANS")
  return dispatch => {
    return axios.get(`/api/messages/fetch/${userid}`)
      .then(response =>{
				console.log("RESPONSE", response)
				dispatch(fetchMessagesSuccess(response));	  
	  })
      .catch(error => {
		  dispatch(fetchMessagesFailure(error));
	  });
  }
}


export function fetchMyPatients(userid) {
  console.log("FETCH MY PATIENTS")
  return dispatch => {
    dispatch(fetchMessagesRequest())
    return axios.get(`/api/messages/fetch/${userid}`)
      .then(response =>{
				console.log("RESPONSE", response)
				dispatch(fetchMessagesSuccess(response));	  
	  })
      .catch(error => {
		  dispatch(fetchMessagesFailure(error));
	  });
  }
}