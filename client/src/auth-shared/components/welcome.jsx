import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

const buttonStyles = {
  hoverColor: "rgba(255,255,255,1)",
  backgroundColor:"rgba(255,255,255,.6)",
  labelStyle: {color:"#fff"},
  rippleColor: '#333',
  styles: { height: '50px', borderRadius:'1em'}
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
                         <FlatButton label="Learn More" hoverColor={buttonStyles.hoverColor} style={buttonStyles.styles} backgroundColor={buttonStyles.backgroundColor} />
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
                    
            <section>
                <div className="wrapper">
                    <ul>
                        <li>
                            Neekon
                        </li>
                        <li>
                            Kent
                        </li>
                        <li>
                            Yara
                        </li>
                        <li>
                            Mike
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