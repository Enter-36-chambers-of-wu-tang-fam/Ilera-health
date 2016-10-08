import React, { Component } from 'react';
import DashboardInsurance from './dashboard-insurance.jsx';
import DashboardReminders from './dashboard-reminders.jsx';

const DashboardMain = () => {

    return (
        <div className="dashboardMain">
           <div id="mainDashWelcomeMobile">
                <img src={localStorage.getItem("photo")} alt=""/>
                <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
            </div>
            <DashboardInsurance />
            <div className="mainDashWelcome">
                <img src={localStorage.getItem("photo")} alt=""/>
                <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
            </div>
            <DashboardReminders />
        </div>
    );

};

export default DashboardMain;