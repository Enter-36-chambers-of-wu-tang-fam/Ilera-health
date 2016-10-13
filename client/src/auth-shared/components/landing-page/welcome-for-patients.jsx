// For Patients section of the landing page
// React
import React from 'react';

const ForPatients = () => {
	return (
		<section id='forpatients' className="homeFors">
			<div className="introPhotos">
				<h2>For Patients</h2>
			</div>
			<div className="wrapper">
				<h3>At Ilera, we put the power back in your hands. You securely
					control who you share your records with.
				</h3>
				<ul>
					<li>
						<i className="material-icons">flight_takeoff</i>
						<h4>Accessible</h4>
						<p>Traveling? Moving? No worries, your records are
							always with you.
						</p>
					</li>
					<li>
						<i className="material-icons">enhanced_encryption</i>
						<h4>Secure</h4>
						<p>You decide who has access to your records with a
							single click.
						</p>
					</li>
					<li>
						<i className="material-icons">sms</i>
						<h4>Convenient</h4>
						<p>Questions? Need an appointment? Send your physician
							a quick message!
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default ForPatients;
