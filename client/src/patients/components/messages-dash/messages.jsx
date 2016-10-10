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
      // that.handleSave(msg)
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
    const { messages, socket, chosen, dispatch, user, contact, height } = this.props;
    console.log("$$$message$$", messages)
    if(messages && messages.length > 0 && chosen === true){
      return (
        <div>
          <div id="chatBoard" style={ {minHeight: height} }>
            <div>
              <h4>{contact.first} {contact.last}</h4>
            </div>
            <div>
              {messages.map( message => {
                console.log("$$MESSAGES", message, user);
                if( Array.isArray(message) ){
                  return message.map( item => {
                    if(item.sender_id == user || item.user == user){
                      return <div className="messagesUser">
                                <div>
                                  <img src="../../styles/background_images/tailBlue.png" alt=""/>
                                 <p> { item.direct_message } </p>
                                </div>
                              </div>
                    }else{
                      return <div className="messagesIncoming">
                                <div>
                                  <img src="../../styles/background_images/tail.png" alt=""/>
                                  <p> { item.direct_message } </p>
                                </div>
                              </div>
                    }
                      
                  })
                }else{
                  if(message.user == user){
                    return <div className="messagesUser">
                              <div>
                                <img src="../../styles/background_images/tailBlue.png" alt=""/>
                                <p> { message.direct_message } </p>
                              </div>
                          </div>
                  }else{
                    return <div className="messagesIncoming">
                            <div>
                              <img src="../../styles/background_images/tail.png" alt=""/>
                              <p> { message.direct_message } </p>
                            </div>
                          </div>
                  }
                }
                
              })}
            </div>
            <MessageInput socket={socket} user={user} handleSave={this.handleSave.bind(this)} />
          </div>
             
        </div>
      );
      } else{
        return (
          <div>
            <div id="chatBoard" style={ {minHeight: height} }>
              <div></div>
              <div>
                <h3>Select from the left column...</h3>
              </div>
              <MessageInput socket={socket} user={user} contact={contact} />
            </div>
        </div>
      );
    }
  }
};