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
                    <p className="splitLogo welcomeMy2">my ilera</p> 
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

            <section className="homeFors">
                <div className="introPhotos">
                    <h2>For Patients</h2>
                </div>
                <div className="wrapper">
                    <h3>At Ilera, we put the power back in your hands. You securely control who you share your records with.</h3>
                    <ul>
                        <li>
                            <i className="material-icons">flight_takeoff</i>
                            <h4>Accessible</h4>
                            <p>Traveling? Moving? No worries, your records are always with you.</p>
                        </li>
                        <li>
                            <i className="material-icons">enhanced_encryption</i>
                            <h4>Secure</h4>
                            <p>You decide who has access to your records with a single click.</p>
                        </li>
                        <li>
                            <i className="material-icons">sms</i>
                            <h4>Convenient</h4>
                            <p>Questions? Need an appointment? Send your physician a quick message!</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="homeFors">
                <div className="introPhotos introProviders">
                    <h2>For Providers</h2>
                </div>
                <div className="wrapper">
                    <h3>At Ilera, we put the power back in your hands. You securely control who you share your records with.</h3>
                    <ul>
                        <li>
                            <i className="material-icons">people</i>
                            <h4>Accessible</h4>
                            <p>Traveling? Moving? No worries, your records are always with you.</p>
                        </li>
                        <li>
                            <i className="material-icons">rate_review</i>
                            <h4>Accessible</h4>
                            <p>Traveling? Moving? No worries, your records are always with you.</p>
                        </li>
                        <li>
                            <i className="material-icons">call_merge</i>
                            <h4>Accessible</h4>
                            <p>Traveling? Moving? No worries, your records are always with you.</p>
                        </li>
                    </ul>
                </div>
            </section>
                    
            <section className="teamSec">
                <div className="introPhotos introTeam">
                    <h2>Your Team</h2>
                </div>
                <div className="wrapper">
                    <h3>Ilera means 'health'in Yoruba. And your health, privacy, and something are our priority.</h3>
                    <ul className="team">
                        <li>
                            <img src="../../styles/background_images/neekon.png" alt=""/>
                            <div className="teamProfile">
                                <h4>Neekon Etemad</h4>
                                <h5>Software Engineer</h5>
                                <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                            </div>
                        </li>
                        <li>
                            <img src="../../styles/background_images/kent.png" alt=""/>
                            <div className="teamProfile">
                                <h4>Kent Moreland</h4>
                                <h5>Software Engineer</h5>
                                <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                            </div>
                        </li>
                        <li>
                            <img src="../../styles/background_images/yara.png" alt=""/>
                            <div className="teamProfile">
                                <h4>Yara Tercero-Parker</h4>
                                <h5>Software Engineer</h5>
                                <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                            </div>
                        </li>
                        <li>
                            <img src="../../styles/background_images/MichaelO.png" alt=""/>
                            <div className="teamProfile">
                                <h4>Michael Olorunnisola</h4>
                                <h5>Software Engineer</h5>
                                <p>Lorem ipsum desc goes here. Forthecoming ipsum dipsum.</p>
                            </div>
                        </li>
                    </ul>
                 </div>
            </section>
        </main>
    );
};

export default Welcome;