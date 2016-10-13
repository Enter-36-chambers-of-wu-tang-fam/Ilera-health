import React from 'react';
import * as actions from '../../actions/messages.js';

 const MessageSearch = ({ user, contacts, userSelected, height }) => {
	return (
		<div>
			<form>
				<input
          type="text"
          placeholder="Search Contact"
          name="messageSearch"
          id="messageSearch"
        />
			</form>
		</div>
	);
};

export default MessageSearch;
