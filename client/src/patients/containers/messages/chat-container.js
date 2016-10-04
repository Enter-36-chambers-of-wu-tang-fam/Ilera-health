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
            chosenid: ''
        }
    }
    componentWillMount() {
        const { dispatch, user, userType } = this.props;

        console.log("USER TYPE", this.props)
        if(userType === 'patient'){
            dispatch(contacts.fetchMyPhysicians(this.state.uid));
        }else{
            dispatch(contacts.fetchMyPatients(this.state.uid))
        }
    }

    // componentWillReceiveProps(nextProps){
	// 	const messages = [];
    //     nextProps.messages.map( message => {
    //         if( message.sender_id == this.state.uid && message.receiver_id == this.state.chosenid || message.sender_id == this.state.chosenid && message.receiver_id == this.state.uid){
    //             messages.push(message);
    //         }
    //     })
    //     if(nextProps.newMessage){
    //         messages.push(nextProps.newMessage)
    //     }
    //     this.setState({ messages: messages});
    // }

    userSelected (userid, chosenid, receiverType){
        const { dispatch } = this.props;
        dispatch(actions.fetchMessages(this.state.uid, chosenid));
        this.setState({ chosen: true, chosenid: chosenid });
    }

    render() {
      return (
          <div className="chat">
            <MessageContacts {...this.props} userSelected={this.userSelected.bind(this)} contacts={this.props.contacts.data || []} user={this.state.uid} />
            <Messages {...this.props} chosen={this.state.chosen} chosenid={this.state.chosenid} messages={this.props.messages || []} user={this.state.uid} socket={ window.socket } />
          </div>

      );
    }
};

export default connect(state => ({
  messages: state.messages.messages,
  userType: state.authentication.userType,
  contacts: state.contacts.contacts
}))(ChatContainer)
