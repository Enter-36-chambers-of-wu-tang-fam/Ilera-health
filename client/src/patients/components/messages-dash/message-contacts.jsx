import React from 'react';
import * as actions from '../../actions/messages.js';
import ContactItem from './message-contact-item.jsx';
import MessageSearch from './message-search.jsx';

 const MessageContacts = ({ user, contacts, userSelected, height }) => {
	return (
		<div className="messageContacts" style={ {minHeight: height} }>
			<div></div>
			<MessageSearch />
			<ul>
				{contacts.map( contact => {
					return <ContactItem
            user={user}
            userSelected={userSelected}
            key={ contact.id }
            contact={contact}
          />
				})}
			</ul>
		</div>
	);
};

export default MessageContacts;
