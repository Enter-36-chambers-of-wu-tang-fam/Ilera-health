// Patient profile dashboard shown above forms patient can update
// React
import React, { Component } from 'react';
// Components
import DashboardReminder from '../../containers/main-dash/dashboard-reminders.jsx';

const ProfileDash = () => {

	return (
		<div className="profileDash">
			<div>
				<h3>Quick Links</h3>
			</div>
			<DashboardReminder />
		</div>
	);

};

export default ProfileDash;