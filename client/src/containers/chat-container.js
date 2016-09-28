import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/messages.js';
import CryptoJS from 'crypto-js';
import Messages from '../components/shared/messages.jsx';
import MessageContacts from '../components/shared/message-contacts.jsx';
import { router } from 'react-router';


// Sockets
import io from 'socket.io-client';
const socket = io('', { path: '/patient/messages' });

class ChatContainer extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props){
        super(props);
        console.log("Props in container: ", props.messages)
        
         //get encoded id from local storage
        let id = localStorage.getItem('uid');
        //code to decode user id stored in local storage
        let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
        const uid = code.toString(CryptoJS.enc.Utf8);
        this.state = {
            uid: uid
        }
    }
    componentWillMount() {
        const { dispatch, user, userType } = this.props;
        dispatch(actions.fetchMessages(this.state.uid));
        if(userType === 'patient'){
            dispatch(actions.fetchMyPhysicians(this.state.uid));
        }else{
            dispatch(actions.fetchMyPatients(this.state.uid))
        }
    }

    componentDidMount(){
        
    }

    render() {
      return (
          <div className="chat">
            <MessageContacts />
            <Messages {...this.props} messages={this.props.messages} uid={this.state.uid} socket={ socket } />
          </div>
          
      );
    }
};

export default connect(state => ({
  messages: state.messages.messages,
  userType: state.authentication.userType
}))(ChatContainer)
