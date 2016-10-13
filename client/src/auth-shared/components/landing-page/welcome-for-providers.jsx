// For Providers section of landing page
// React
import React from 'react';

const ForProviders = () => {
	return (
		<section id='forproviders' className="homeFors">
			<div className="introPhotos introProviders">
				<h2>For Providers</h2>
			</div>
			<div className="wrapper">
				<h3>Strengthen your relationships with patients. An easy and
					intuitive interface allows you to keep track of your patients,
					their medicines, and open up communication.
				</h3>
				<ul>
					<li>
						<i className="material-icons">people</i>
						<h4>People-Centered</h4>
						<p>Track progress. Increase transparency.</p>
					</li>
					<li>
						<i className="material-icons">sms</i>
						<h4>Messaging</h4>
						<p>Safe and secure messaging promoting increased
							communication.
						</p>
					</li>
					<li>
						<i className="material-icons">call_merge</i>
						<h4>Convenient</h4>
						<p>Track your patients, their health, meds, progress,
							and more. All in one place.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default ForProviders;
