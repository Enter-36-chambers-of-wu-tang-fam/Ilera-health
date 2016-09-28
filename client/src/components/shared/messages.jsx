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
    console.log("1 WILL MOUNT", this.props)
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.messages !== nextProps.messages) {
      console.log("2 WILL RECEIVE", nextProps.chosenid)
      this.setState({ messages: nextProps.messages, chosen: nextProps.chosen, chosenid: nextProps.chosenid })
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
    let user = this.props.uid;
    let receiver = this.state.chosenid;
    console.log("RECEIVER", receiver)
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage, user, receiver));
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