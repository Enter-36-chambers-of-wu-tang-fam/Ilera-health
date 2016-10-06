import React, { Component } from 'react';
import DashboardInsurance from './dashboard-insurance.jsx';

const DashboardMain = () => {

    return (
        <div className="dashboardMain">
           
            <DashboardInsurance />
            <div className="mainDashWelcome">
                <img src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg" alt=""/>
                <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
            </div>
            <div>
                <h3>Reminders</h3>
                <div id="dashReminders">
                    <ul className='clearfix'>
                        <li className="reminders">
                            <div>
                                <p>Sept</p>
                                <p>27</p>
                            </div>
                            <h6>Dr. Yang - Yearly checkup.</h6>
                        </li>
                        <li className="reminders">
                            <div>
                                <p>Oct</p>
                                <p>15</p>
                            </div>
                            <h6>Refill expires.</h6>
                        </li>
                        <li className="reminders">
                            <div>
                                <p>Oct</p>
                                <p>27</p>
                            </div>
                            <h6>Dr. Yolo - Dentist appointment.</h6>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default DashboardMain;