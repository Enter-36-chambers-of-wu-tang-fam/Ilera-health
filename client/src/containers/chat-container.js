import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/messages.js';
import Messages from '../components/shared/messages.jsx';

// Sockets
import io from 'socket.io-client';
const socket = io('', { path: '/patient/messages' });

class ChatContainer extends Component {
    componentWillMount() {
        const { dispatch, user } = this.props;
    }

    render() {
      return (
          <Messages {...this.props} socket={ socket } />
      );
    }
};

function mapStateToProps(state) {
  return {
      messages: state.messages
  }
}

export default connect(mapStateToProps)(ChatContainer)
