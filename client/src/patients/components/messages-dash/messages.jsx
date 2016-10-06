import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import MessageInput from './message-input.jsx';

export default class Messages extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { socket, user, dispatch, chosenid } = this.props;
    var that = this;
    socket.emit('chat mounted', user);
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      console.log("JOIN CHANNEL");
    })
     socket.on('new bc message', function(msg) {
      console.log("NEW MESSAGE INCOMING", msg, user, chosenid);
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
    const { dispatch, user, chosenid, senderType, receiverType } = this.props;
    if (newMessage.direct_message.length !== 0) {
      dispatch(actions.newMessage(senderType, receiverType, newMessage, user, chosenid));
    }
  }

  render(){
    const { messages, socket, chosen, dispatch, user, contact } = this.props;
    console.log("$$$message$$", messages)
    if(messages && messages.length > 0 && chosen === true){
      return (
        <div>
          <div id="chatBoard">
            {messages.map( message => {
              console.log("$$MESSAGES", message);
              if( Array.isArray(message) ){
                return message.map( item => {
                  console.log("$$ITEM", item.direct_message);
                    return <div>
                      <h5> { item.first } { item.last }: </h5>
                      <p> { item.direct_message } </p>
                    </div>
                })
              }else{
                if(message.sender_id == user && message.senderType == localStorage.getItem('userType')){
                  return <div>{ message.first } { message.last }: { message.direct_message }</div>
                }else{
                  return <div>
                    <h5> { contact.first } { contact.last }: </h5>
                    <p> { message.direct_message } </p>
                  </div>
                }
              }
              
            })}
          </div>
             <MessageInput socket={socket} user={user} handleSave={this.handleSave.bind(this)} />
        </div>
      );
      } else{
        return (
          <div>
            <div id="chatBoard">
              <h3>Select from the left column...</h3>
            </div>
            <MessageInput socket={socket} user={user} contact={contact} />
        </div>
      );
    }
  }
};