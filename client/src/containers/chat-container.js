import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/messages.js';
import Messages from '../components/shared/messages';

//socketio
import io from 'socket.io-client';
const socket = io.connect('', { path: '/api/chat' });

class ChatContainer extends Component {

    componentWillMount() {
      const { user, dispatch } = this.props;
      dispatch(actions.fetchMessages());
    }

    render() {
      console.log("Message****", this.state.messages);
      return (
          <Messages {...this.props} socket={ socket } />
      );
    }
};

const mapStateToProps = (state) => {
  console.log("*STATE*", state)
  return {
    messages: state.messages.newAssignment
  }
};

export default connect(mapStateToProps)(ChatContainer);