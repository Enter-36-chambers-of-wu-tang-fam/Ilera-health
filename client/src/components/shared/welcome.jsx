import React, { Component } from 'react';

const Welcome = () => {
    return (
        <main>
            <section></section>
            <section>
                <h2>For Patients</h2>
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
            </section>
            <section>
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
            </section>
                
            <section>
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
            </section>
        </main>
    );
};

export default Welcome;