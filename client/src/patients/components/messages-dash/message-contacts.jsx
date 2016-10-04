import React from 'react';
import * as actions from '../../actions/messages.js';
import ContactItem from './message-contact-item.jsx';

 const MessageContacts = ({ user, contacts, userSelected}) => {
	return (
		<div className="messageContacts">
			<ul>
				{contacts.map( contact => {
					return <ContactItem user={user} userSelected={userSelected} key={ contact.id } contact={contact}/>
				})}
			</ul>
		</div>
	);
};

export default MessageContacts;