// Top of the patient dashboard
// React
import React from 'react';
// Components
import DashboardInsurance from '../../containers/main-dash/dashboard-insurance.jsx';
import DashboardReminders from '../../containers/main-dash/dashboard-reminders.jsx';

const DashboardMain = () => {
 const profilePicture = {
		backgroundImage: `url(${localStorage.getItem('photo') ?
      localStorage.getItem('photo') :
      '/styles/defaults/default_photo.png' })`,
		backgroundSize:'cover',
		width: "150px",
		height: "150px",
		borderRadius: "50%",
		display: "block",
		margin: "20px auto"
	};

	return (
		<div className="dashboardMain">
			<div id="mainDashWelcomeMobile">
				<div className="img" style={profilePicture}>
				</div>
					<h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
			</div>
			<DashboardInsurance />
			<div className="mainDashWelcome">
				<div className="img" style={profilePicture}>
				</div>
				<h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
			</div>
			<DashboardReminders />
		</div>
	);

};

export default DashboardMain;
