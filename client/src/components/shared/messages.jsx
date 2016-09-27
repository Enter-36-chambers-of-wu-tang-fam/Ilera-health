import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import MessageInput from './message-input.jsx';

export default class Messages extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { socket, user, dispatch } = this.props;
    socket.emit('chat mounted', user);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    // socket.on('new channel', channel =>
    //   dispatch(actions.receiveRawChannel(channel))
    // );
    // socket.on('receive socket', socketID =>
    //   dispatch(authActions.receiveSocket(socketID))
    // );
    // socket.on('receive private channel', channel =>
    //   dispatch(actions.receiveRawChannel(channel))
    // );
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }

  render(){
    const { messages, socket, typers, dispatch, user, screenWidth} = this.props;
    return (
        <div>
          <div id="chatBoard"></div>
          <form >
            <input 
              id="message" 
            />
             <MessageInput socket={socket} user={user} onSave={this.handleSave.bind(this)} />
          </form>
        </div>
    );
}
};