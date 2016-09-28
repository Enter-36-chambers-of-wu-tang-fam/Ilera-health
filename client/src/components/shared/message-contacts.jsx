import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import ContactItem from './message-contact-item.jsx';

const MessageContacts = () => {

      return (
        <div className="messageContacts">
            <ul>
                <ContactItem />
                <ContactItem />
                <ContactItem />
            </ul>
        </div>
      );
};

export default MessageContacts;