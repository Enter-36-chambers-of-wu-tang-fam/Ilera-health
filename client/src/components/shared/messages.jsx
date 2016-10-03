import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import MessageInput from './message-input.jsx';

export default class Messages extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      chosen: this.props.chosen,
      chosenid: ''
    }
  }

  componentWillMount() {
  }
  
  componentWillReceiveProps(nextProps) {
      this.setState({ messages: nextProps.messages, chosen: nextProps.chosen, chosenid: nextProps.chosenid })
  }

  componentDidMount() {
    const { socket, uid, dispatch } = this.props;
    socket.emit('chat mounted', uid);
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      cosole.log("JOIN CHANNEL");
    })
     socket.on('new bc message', function(channel) {
      cosole.log("NEW MESSAGE INCOMING");
    })
    socket.on('new channel', function(channel) {
      cosole.log("NEW CHANNEL");
    });
    socket.on('new private channel', function(socketID, channel) {
      cosole.log("NEW PRIVATE CHANNEL");
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
    const { messages, socket, typers, dispatch, uid, screenWidth} = this.props;
    console.log("3 LOGGG", this.state.messages)
    console.log("3 PROOOOOOPS", this.state.messages, this.props.uid)
    if(this.state.messages.length > 0 && this.state.chosen === true){
      return (
        <div>
          <div id="chatBoard">
            {this.state.messages.map( message => {
              if(message.sender_id == this.props.uid){
                return <div>USER1: {message.direct_message}</div>
              }else{
                return <div>USER2: {message.direct_message}</div>
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