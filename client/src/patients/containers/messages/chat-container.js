import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';

import * as contacts from '../../actions/contacts.js';
import CryptoJS from 'crypto-js';
import Messages from '../../components/messages-dash/messages.jsx';

import MessageContacts from '../../components/messages-dash/message-contacts.jsx';

import { router } from 'react-router';

// Sockets
// separte file connecting to socket
import io from 'socket.io-client';
window.socket = io.connect();

class ChatContainer extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props){
        super(props);
        console.log("Props in container: ", props)

         //get encoded id from local storage
        let id = localStorage.getItem('uid');
        //code to decode user id stored in local storage
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

    componentWillReceiveProps(nextProps){
        console.log("NEXT PROPS", nextProps)
				const messages = [];
        nextProps.messages.map( message => {
            if( message.sender_id == this.state.uid && message.receiver_id == this.state.chosenid || message.sender_id == this.state.chosenid && message.receiver_id == this.state.uid){
                messages.push(message);
            }
        })
        if(nextProps.newMessage){
            messages.push(nextProps.newMessage)
        }
        console.log("****HERE****", messages)
        this.setState({ messages: messages});
    }

    userSelected (userid, chosenid, receiverType){
			const { dispatch } = this.props;
				dispatch(actions.fetchMessages(this.state.uid, chosenid));
				this.setState({ chosen: true, chosenid: chosenid });
    }

    render() {
        console.log("*****MESSAGES", this.props.messages)
      return (
          <div className="chat">
            <MessageContacts {...this.props} userSelected={this.userSelected.bind(this)} contacts={this.props.contacts} user={this.state.uid} />
            <Messages {...this.props} chosen={this.state.chosen} chosenid={this.state.chosenid} messages={this.state.messages} uid={this.state.uid} socket={ window.socket } />
          </div>

      );
    }
};

export default connect(state => ({
  messages: state.messages.messages,
  userType: state.authentication.userType,
  contacts: state.contacts
}))(ChatContainer)
