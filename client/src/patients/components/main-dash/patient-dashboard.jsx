import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import DashboardMessages from './dashboard-messages.jsx';
import DashboardRecords from './dashboard-records.jsx';
import DashboardPhysicians from './dashboard-physicians.jsx';
import DashboardMain from './dashboard-main.jsx';
import DashboardProfile from './dashboard-profile.jsx';
import DashboardHealthLog from './dashboard-healthLog.jsx';
import DashboardMeds from './dashboard-meds.jsx';

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
              <Link to='patient/records'>
                <DashboardRecords />
              </Link>
              <Link to='/patient/messages'>
                <DashboardMessages />
              </Link>
              <Link to='patient/myphysicians'>
                <DashboardPhysicians />
              </Link>
            </div>
            <div className="dashboardRows bottomRow clearfix">
              <Link to='patient/medications'>
                <DashboardMeds />
              </Link>
              <Link to='patient/healthLog'>
                <DashboardHealthLog />
              </Link>

              <Link to='patient/profile'>
                <DashboardProfile />
              </Link>

            </div>
          </div>
      );
    }
}
