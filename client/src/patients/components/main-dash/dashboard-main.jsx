import React, { Component } from 'react';
import DashboardInsurance from './dashboard-insurance.jsx';
import DashboardReminders from './dashboard-reminders.jsx';

const DashboardMain = () => {

    return (
        <div className="dashboardMain">
           
            <DashboardInsurance />
            <div className="mainDashWelcome">
                <img src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg" alt=""/>
                <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
            </div>
            <DashboardReminders />
        </div>
    );

};

export default DashboardMain;