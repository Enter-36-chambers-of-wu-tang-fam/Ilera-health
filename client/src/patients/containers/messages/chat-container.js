import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import * as contacts from '../../actions/contacts.js';
import CryptoJS from 'crypto-js';
import Messages from '../../components/messages-dash/messages.jsx';
import MessageContacts from '../../components/messages-dash/message-contacts.jsx';
import { router } from 'react-router';

// Sockets
import io from 'socket.io-client';
window.socket = io.connect();

class ChatContainer extends Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props){
		super(props);
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		const uid = code.toString(CryptoJS.enc.Utf8);
		this.state = {
			uid: uid,
			messages: [],
			chosen: false,
			chosenid: '',
			windowHeight: '',
			toggle: true
		}
	}

	handleClick() {
		this.setState({ toggle: !this.state.toggle })
	}

	componentWillMount() {
		const { dispatch, userType } = this.props;
		if(userType === 'patient'){
			dispatch(contacts.fetchMyPhysicians(this.state.uid));
		}else{
			dispatch(contacts.fetchMyPatients(this.state.uid))
		}
		
		this.setState({windowHeight: window.innerHeight - 50 });

	}

	userSelected (userid, chosenid, receiverType, senderType, contact){
		const { dispatch } = this.props;
		dispatch(actions.fetchMessages(this.state.uid, senderType, chosenid, receiverType));
		this.setState({ chosen: true, chosenid: chosenid, senderType: senderType, receiverType: receiverType, chosenContact: contact, toggle: !this.state.toggle });
	}

	render() {
		const { windowHeight } = this.state;
		return (
			<div>
				<span className="contactsTab" onClick={this.handleClick.bind(this)}><i className="fa fa-users fa-2x" aria-hidden="true"></i></span>
				<div className="chat">
					<div className={ this.state.toggle ? 'hideContacts' : 'showContacts'}>
						<MessageContacts {...this.props} 
							userSelected={this.userSelected.bind(this)} 
							contacts={this.props.contacts.data || []} 
							height={windowHeight}
							user={this.state.uid} />
					</div>
					<Messages {...this.props} 
						chosen={this.state.chosen} 
						chosenid={this.state.chosenid} 
						messages={this.props.messages || []} 
						user={this.state.uid} 
						contact={ this.state.chosenContact }
						senderType={this.state.senderType}
						receiverType={this.state.receiverType}
						height={windowHeight}
						socket={ window.socket } />
				</div>
			</div>
		);
	}
};

export default connect(state => ({
  messages: state.messages.messages,
  userType: state.authentication.userType,
  contacts: state.contacts.contacts
}))(ChatContainer)
