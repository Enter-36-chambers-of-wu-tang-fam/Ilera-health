import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import MessageInput from './message-input.jsx';

export default class Messages extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXTPROPS", nextProps)
  }

  componentDidMount() {
    const { socket, uid, dispatch, chosenid } = this.props;
    var that = this;
    socket.emit('chat mounted', uid);
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      console.log("JOIN CHANNEL");
    })
     socket.on('new bc message', function(msg) {
      console.log("NEW MESSAGE INCOMING");
      console.log("NEW MESSAGE INCOMING", msg, uid, chosenid);
      that.handleSave(msg);
    })
    socket.on('new channel', function(channel) {
      console.log("NEW CHANNEL");
    });
    socket.on('new private channel', function(socketID, channel) {
      console.log("NEW PRIVATE CHANNEL");
    })
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    let user = this.props.uid;
    if (newMessage.text.length !== 0) {
      dispatch(actions.newMessage('patient', 'physician', newMessage, user, 1));
    }
  }

  render(){
    const { messages, socket, chosen, dispatch, uid} = this.props;
    if(messages.length > 0 && chosen === true){
      return (
        <div>
          <div id="chatBoard">
            {messages.map( message => {
              if(message.sender_id == this.props.uid){
                return <div>USER1: {message.text || message.direct_message}</div>
              }else{
                return <div>USER2: {message.text || message.direct_message}</div>
              }
            })}
          </div>
             <MessageInput socket={socket} user={uid} onSave={this.handleSave.bind(this)} />
        </div>
      );
    }else{
      return (
        <div>
          <div id="chatBoard">
            <h3>Select from the left column...</h3>
          </div>
          <MessageInput socket={socket} user={uid} onSave={this.handleSave.bind(this)} />
       </div>
    );
    }
    
}
};