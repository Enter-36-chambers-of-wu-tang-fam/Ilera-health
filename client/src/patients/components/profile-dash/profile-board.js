import React, { Component } from 'react';
import DashboardReminder from '../main-dash/dashboard-reminders.jsx';

const ProfileDash = () => {

    return (
        <div className="profileDash">
            <div>
                <h3>Quick Links</h3>
            </div>
            <DashboardReminder />
        </div>
    );

};

export default ProfileDash;