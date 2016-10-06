import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

const buttonStyles = {
  hoverColor: "rgba(242,108,44, 0.7)",
  backgroundColor:"rgba(242,108,44,1)",
  labelStyle: {color:"white"},
  rippleColor: '#white',
  styles: { height: '50px', borderRadius:'5px'}
}

const Welcome = () => {
    return (
        <main>
            <section className="welcomeHeader">
                <div>
                    <p className="splitLogo welcomeMy">my</p>
                     
                </div>
                <div>
                    <p className="splitLogo welcomeIlera">ilera</p>
                    <div className="welcomeMessage">
                         <h1>Your Health in Your Hands</h1>
                         <ul>
                         <li>Manage your entire health portfolio in one place</li>
                         <li>Manage and conenct with healthcare providers across disciplines</li>
                         <li>Choose which providers you share your information with</li>
                         <li>Manage all of your medical billing in one place</li>
                         </ul>
                         <FlatButton label="For Patients" hoverColor={buttonStyles.hoverColor} style={buttonStyles.styles} backgroundColor={buttonStyles.backgroundColor} labelStyle={buttonStyles.labelStyle} />
                         <FlatButton label="For Providers" hoverColor={buttonStyles.hoverColor} style={buttonStyles.styles} backgroundColor={buttonStyles.backgroundColor} labelStyle={buttonStyles.labelStyle} />
                     </div>
                </div>
                
            </section>

            <section>
                <div className="introPhotos">
                    <h2>For Patients</h2>
                </div>
                <div className="wrapper">
                    
                    <ul>
                        <li>
                            <h4>Your records, wherever you go.</h4>
                            <i className="material-icons">flight_takeoff</i>
                            <p>Something clever, here</p>
                        </li>
                        <li>
                            <h4>Your health, in your hands.</h4>
                            <i className="material-icons">enhanced_encryption</i>
                            <p>Your health, in your hands.</p>
                        </li>
                        <li>
                            <h4>No more waiting on hold.</h4>
                            <i className="material-icons">sms</i>
                            <p>No more waiting on hold.</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div className="introPhotos introProviders">
                    <h2>For Providers</h2>
                </div>
                <div className="wrapper">
                    <ul>
                        <li>
                            <i className="material-icons">people</i>
                        </li>
                        <li>
                            <i className="material-icons">rate_review</i>
                        </li>
                        <li>
                            <i className="material-icons">call_merge</i>
                        </li>
                    </ul>
                </div>
            </section>
                    
            <section className="teamSec">
                <div className="introPhotos introTeam">
                    <h2>Your Team</h2>
                </div>
                <div className="wrapper">
                    <ul className="team">
                        <li>
                            <img src="../../styles/background_images/neekon.png" alt=""/>
                            <h4>Neekon Etemad</h4>
                            <h5>Software Engineer</h5>
                            <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                        </li>
                        <li>
                            <img src="../../styles/background_images/kent.png" alt=""/>
                            <h4>Kent Moreland</h4>
                            <h5>Software Engineer</h5>
                            <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                        </li>
                        <li>
                            <img src="../../styles/background_images/yara.png" alt=""/>
                            <h4>Yara Tercero-Parker</h4>
                            <h5>Software Engineer</h5>
                            <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                        </li>
                        <li>
                            <img src="../../styles/background_images/MichaelO.png" alt=""/>
                            <h4>Michael Olorunnisola</h4>
                            <h5>Software Engineer</h5>
                            <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                        </li>
                    </ul>
                 </div>
            </section>
        </main>
    );
};

export default Welcome;


// <div className="wrapper">
//                     <img src="../styles/logos/myilera_large_white.png" />
//                     <div className="welcomeMessage">
//                         <h1>Your Health in Your Hands</h1>
//                         <ul>
//                         <li>Manage your entire health portfolio in one place</li>
//                         <li>Manage and conenct with healthcare providers across disciplines</li>
//                         <li>Choose which providers you share your information with</li>
//                         <li>Manage all of your medical billing in one place</li>
//                         </ul>
//                         <FlatButton label="Learn More" hoverColor={buttonStyles.hoverColor} style={buttonStyles.styles} backgroundColor={buttonStyles.backgroundColor} />
//                     </div>
//                 </div>