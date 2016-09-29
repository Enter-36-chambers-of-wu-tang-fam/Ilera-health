import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';

export class ContactItem extends Component {
    constructor(props){
        super(props);
    }

    userSelected (){
        console.log("YOOOOO", this.props.user, this.props.contact.id_physician)
        let user = this.props.user;
        if(this.props.contact.id_physician){
            let receiver = this.props.contact.id_physician;
            let receiverType = 'physician';
        }
        this.props.userSelected(user, receiver, receiverType);
    }

    render(){
        return (
        <li className="contactItem">    
            <a onClick={ this.userSelected.bind(this) }>
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

export default ContactItem;