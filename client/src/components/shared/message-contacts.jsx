import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messages.js';
import ContactItem from './message-contact-item.jsx';

export default class MessageContacts extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			contacts: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ contacts: nextProps.contacts.contacts.data })
	}

	render(){
		return (
			<div className="messageContacts">
				<ul>
					{this.state.contacts.map( contact => {
						return <ContactItem user={this.props.user} userSelected={this.props.userSelected} key={ contact.id } contact={contact}/>
					})}
				</ul>
			</div>
		);
	}
};