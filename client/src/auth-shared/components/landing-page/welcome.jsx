// Landing page parent component
import React from 'react';
// Components
import WelcomeIntro from './Welcome-intro.jsx';
import ForPatients from './welcome-for-patients.jsx';
import ForProviders from './welcome-for-providers.jsx';
import WelcomeTeam from './welcome-team.jsx';

const Welcome = () => {
	return (
		<main>
			<WelcomeIntro />
			<ForPatients />
			<ForProviders />
      <WelcomeTeam />          
		</main>
	);
};

export default Welcome;