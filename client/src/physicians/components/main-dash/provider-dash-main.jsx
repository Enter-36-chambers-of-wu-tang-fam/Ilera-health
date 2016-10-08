import React, { Component } from 'react';
import DashboardPatientProfile from './provider-dash-pat-profile.jsx';


const DashboardMain = () => {

    return (
        <div className="dashboardMain">
            <h3>No clients scheduled...</h3>
            <h2>Today's Appointments</h2>
            <div>
                <DashboardPatientProfile />
                <DashboardPatientProfile />
                <DashboardPatientProfile />
                <DashboardPatientProfile />
                <DashboardPatientProfile />
                <DashboardPatientProfile />
                <DashboardPatientProfile />
            </div>
        </div>
    );

};

export default DashboardMain;