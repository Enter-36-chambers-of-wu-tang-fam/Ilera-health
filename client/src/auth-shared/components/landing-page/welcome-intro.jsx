// Opening/intro for landing page
// React
import React from 'react';
// Material UI
import FlatButton from 'material-ui/FlatButton';

const buttonStyles = {
	hoverColor: "rgba(242,108,44, 0.7)",
	backgroundColor:"rgba(242,108,44,1)",
	labelStyle: {color:"white"},
	rippleColor: '#white',
	styles: { height: '50px', borderRadius:'5px'}
}

const WelcomeIntro = () => {
	return (
		<section className="welcomeHeader">
			<div>
				<p className="splitLogo welcomeMy">my</p>
				<p className="splitLogo welcomeMy2">my ilera</p>
			</div>
			<div>
				<p className="splitLogo welcomeIlera">ilera</p>
				<div className="welcomeMessage">
					<h1>Your Health in Your Hands</h1>
					<ul>
						<li>Manage your entire health portfolio
							in one place
						</li>
						<li>Manage and connect with healthcare providers
							across disciplines
						</li>
						<li>Choose which providers you share your
							information with
						</li>
					</ul>
					<a href='#forpatients'>
						<FlatButton
							label="For Patients"
							hoverColor={buttonStyles.hoverColor}
							style={buttonStyles.styles}
							backgroundColor={buttonStyles.backgroundColor}
							labelStyle={buttonStyles.labelStyle} />
					</a>
					<a href='#forproviders'>
						<FlatButton
							label="For Providers"
							hoverColor={buttonStyles.hoverColor}
							style={buttonStyles.styles}
							backgroundColor={buttonStyles.backgroundColor}
							labelStyle={buttonStyles.labelStyle} />
					</a>
				</div>
			</div>
		</section>
	);
};

export default WelcomeIntro;
