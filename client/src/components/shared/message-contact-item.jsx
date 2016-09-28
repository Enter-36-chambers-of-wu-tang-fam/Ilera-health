import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';

const ContactItem = () => {

      return (
        <li className="contactItem">    
            <div>
                 <img src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg" alt=""/>
            </div>
           
            <div>
                <h4>Name Goes Here</h4>
            </div>
            <div>
                <i className="fa fa-comment" aria-hidden="true"></i>
            </div>
        </li>
      );
};

export default ContactItem;