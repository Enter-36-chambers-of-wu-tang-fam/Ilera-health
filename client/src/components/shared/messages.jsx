import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import MessageInput from './message-input.jsx';

export default class Messages extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: []
    }
  }

  componentWillMount() {
    console.log("1 WILL MOUNT", this.props)
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.messages !== nextProps.messages) {
      console.log("2 WILL RECEIVE", nextProps)
      this.setState({ messages: nextProps })
    // }
  }

  componentDidMount() {
    const { socket, uid, dispatch } = this.props;
    socket.emit('chat mounted', uid);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', uid =>
      dispatch(actions.typing(uid))
    );
    socket.on('stop typing bc', uid =>
      dispatch(actions.stopTyping(uid))
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
    const { messages, socket, typers, dispatch, uid, screenWidth} = this.props;
    console.log("3 LOGGG", this.state.messages)
    console.log("3 PROOOOOOPS", this.props.messages, this.props.uid)
    if(this.props.messages.length > 0){
      return (
        <div>
          <div id="chatBoard">
            {messages.map( message => {
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
            Loading...
          </div>
          <form >
            <input 
              id="message" 
            />
             <MessageInput socket={socket} user={uid} onSave={this.handleSave.bind(this)} />
          </form>
        </div>
    );
    }
    
}
};