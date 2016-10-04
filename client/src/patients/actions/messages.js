import axios from 'axios';
import * as types from './action-constants';

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

export function newMessage(senderType, receiverType, message, senderid, receiverid) {
	
  return dispatch => {
    dispatch(addMessageRequest(message))
    return axios.post('/api/messages/newmessage', {sender_type: senderType, receiver_type: receiverType, direct_message: `${message.text}`, sender_id: senderid, receiver_id: receiverid})
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

export function fetchMessages(userid, senderType, rid, receiverType) {
  return dispatch => {
    dispatch(fetchMessagesRequest())
    return axios.get(`/api/messages/${senderType}/${userid}/${receiverType}/${rid}`)
      .then(response =>{
				console.log("RESPONSE", response.data)
				dispatch(fetchMessagesSuccess(response.data));	  
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

const fetchPatientPhysicians = (physicians) => {
	return {
		type: types.PATIENT_FETCH_PHYSICIANS,
		isFetching: false,
		payload: physicians
	}
}