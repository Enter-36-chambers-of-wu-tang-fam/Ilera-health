import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';

export default class ContactItem extends Component {
    constructor(props){
        super(props);
    }

    handleClick (){
        let user = this.props.user;
        let receiver = this.props.contact.id_physician;
        if(this.props.contact.id_physician){
            var receiverType = 'physician';
        }
        this.props.userSelected(user, receiver, receiverType);
    }

    render(){
        return (
        <li className="contactItem">    
            <a onClick={ this.handleClick.bind(this) }>
                <div>
                    <img src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg" alt=""/>
                </div>
            
                <div>
                    <h4>{ this.props.contact.first } { this.props.contact.last}</h4>
                </div>
                <div>
                    <i className="fa fa-comment" aria-hidden="true"></i>
                </div>
            </a>
        </li>
      );
    }
      
};