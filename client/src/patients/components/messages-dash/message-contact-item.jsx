import React, { Component, PropTypes } from 'react';

const ContactItem = ({user, userSelected, contact}) => {

    let handleClick = (contact) => {
			var receiverType, receiver, senderType;
        if(contact.id_physician){
            receiverType = 'physician';
            receiver = contact.id_physician;
            senderType = 'patient'
        }else{
            receiverType = 'patient';
            receiver = contact.id;
            senderType = 'physician';
        }
        userSelected(user, receiver, receiverType, senderType, contact);
    }

    return (
			<li className='contactItem'>
				<a onClick={ handleClick.bind(this, contact) }>
					<div>
						<img
              src='https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg'
              alt=''
            />
					</div>
					<div>
						<h4>{ contact.first } { contact.last}</h4>
					</div>
					<div>
						<i className='fa fa-comment' aria-hidden='true'></i>
					</div>
				</a>
			</li>
    );

};

export default ContactItem;
