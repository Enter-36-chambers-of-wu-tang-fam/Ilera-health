import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import DashboardMessages from './dashboard/dashboard-messages.jsx';
import DashboardRecords from './dashboard/dashboard-records.jsx';
import DashboardPhysicians from './dashboard/dashboard-physicians.jsx';
import DashboardMain from './dashboard/dashboard-main.jsx';
import DashboardProfile from './dashboard/dashboard-profile.jsx';
import DashboardHealthLog from './dashboard/dashboard-healthLog.jsx';
import DashboardMeds from './dashboard/dashboard-meds.jsx';

export default class PatientDashboard extends Component {

    constructor (props){
      super(props)
    }

    render() {
      return (
          <div className="clearfix">
            <div className="dashboardRows clearfix">
              <DashboardMain />
            </div>

            <div className="dashboardRows bottomRow clearfix">
              <DashboardRecords />
              <Link to='patient/messages'>
                <DashboardMessages />
              </Link>
              <DashboardPhysicians />
            </div>
            <div className="dashboardRows bottomRow clearfix">
              <DashboardMeds />
              <Link to='patient/messages'>
                <DashboardHealthLog />
              </Link>
              <DashboardProfile />
              
            </div>
          </div>
      );
    }
}