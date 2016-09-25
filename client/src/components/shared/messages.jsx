import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/messages.js';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });

class Messages extends Component {

    constructor (props){
      super(props);
      console.log("PROPS", props)
      this.state = {
        message: '',
        messages: this.props.messages
      }
    }

    componentDidMount() {
      // const { socket, user, dispatch } = this.props;
      // socket.emit('chat mounted', user);
      // socket.on('new message', msg =>
      //   dispatch(actions.receiveRawMessage(msg))
      // );
      // socket.on('typing', user =>
      //   dispatch(actions.typing(user))
      // );
      // socket.on('stop typing', user =>
      //   dispatch(actions.stopTyping(user))
      // );
      // socket.on('receive socket', socketID =>
      //   dispatch(authActions.receiveSocket(socketID))
      // );
      // socket.on('chat message', socketID =>
      //   dispatch(authActions.receiveSocket(socketID))
      // );
    }

    onSubmit(event) {
      event.preventDefault();
      let that = this;
      let message = that.state.message;
      const { dispatch } = this.props;
      if (message.length > 0) {
        console.log("DISPATCH1")
        dispatch(that.props.onClick(message))
        socket.emit('chat message', message => {
          console.log("DISPATCH2")
          dispatch(that.props.onClick(message))
        });
      }
      that.setState({ message: ''})
    }

    handleChange(event) {
      let that = this;
      that.setState({message: event.target.value});
    }

    render() {
      return (
          <div>
            <div id="chatBoard"></div>
            <form action="">
              <input 
                id="message" 
                value={this.state.message}
                onChange={this.handleChange.bind(this)}
              />
              <button onClick={ this.onSubmit.bind(this) }>Send</button>
            </form>
          </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (message) => {
      dispatch(createMessage(message))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);