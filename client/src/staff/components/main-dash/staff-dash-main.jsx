import React, { Component } from 'react';
import DashboardStaffProfile from './staff-dash-patient-profile.jsx';


const DashboardMain = () => {

    return (
        <div className="dashboardMain">
            <h3>No clients scheduled...</h3>
            <h2>Today's Appointments</h2>
            <div>
                <DashboardStaffProfile />
                <DashboardStaffProfile />
                <DashboardStaffProfile />
                <DashboardStaffProfile />
                <DashboardStaffProfile />
                <DashboardStaffProfile />
                <DashboardStaffProfile />
            </div>
        </div>
    );

};

export default DashboardMain;
