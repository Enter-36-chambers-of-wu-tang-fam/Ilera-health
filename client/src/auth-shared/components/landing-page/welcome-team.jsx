// Team section for landing page
// React
import React from 'react';

const WelcomeTeam = () => {
	return (
		<section id='team' className="teamSec">
			<div className="introPhotos introTeam">
				<h2>Your Team</h2>
			</div>
			<div className="wrapper">
				<h3>Ilera means 'health'in Yoruba. And your health, privacy,
					and something are our priority.
				</h3>
				<ul className="team">
					<li>
						<img src="../../styles/background_images/neekon.png" alt=""/>
						<div className="teamProfile">
							<h4>Neekon Etemad</h4>
							<h5>Software Engineer</h5>
							<p>Life long learner | Basketball player |
								Full stack engineer
							</p>
						</div>
					</li>
					<li>
						<img src="../../styles/background_images/kent.png" alt=""/>
						<div className="teamProfile">
							<h4>Kent Moreland</h4>
							<h5>Software Engineer</h5>
							<p>Dad | Husband | Lover of life | Writer of Code</p>
						</div>
					</li>
					<li>
						<img src="../../styles/background_images/yara.png" alt=""/>
						<div className="teamProfile">
							<h4>Yara Tercero-Parker</h4>
							<h5>Software Engineer</h5>
							<p>Programmer | Traveler | Little Sister |
								Geographically Confused | Dog Parent | Feel free
								to contact!
							</p>
						</div>
					</li>
					<li>
						<img src="../../styles/background_images/MichaelO.png" alt=""/>
						<div className="teamProfile">
							<h4>Michael Olorunnisola</h4>
							<h5>Software Engineer</h5>
							<p>Front-end ninja, back-end sage. Basketball is my
								love and music is my muse. Feel free to contact
								me anytime!
							</p>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default WelcomeTeam;
