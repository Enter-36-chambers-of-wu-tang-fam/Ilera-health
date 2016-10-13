// Provider dashboard button to go to profile
// React
import React from 'react';

const DashboardPatientProfile = ({photo, first, last, time}) => {
	return (
		<div className="dashboardTodayApts">
			<img src={`${photo}`} alt="*" />
			<div>
				<h4>{time}</h4>
				<div>
					<h3>{first} {last}</h3>
				</div>
			</div>
		</div>
	);
};

export default DashboardPatientProfile;