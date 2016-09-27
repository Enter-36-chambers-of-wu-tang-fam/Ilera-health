import React, { Component } from 'react';
import DashboardMessages from './dashboard/dashboard-messages.jsx';
import DashboardSettings from './dashboard/dashboard-settings.jsx';


export default class PatientDashboard extends Component {

    constructor (props){
      super(props)
    }

    render() {
      return (
          <div>
            <div className="dashboardRows clearfix">
              <div></div>
              <div></div>
            </div>
            <div className="dashboardRows bottomRow clearfix">
              <div></div>
              <DashboardMessages />
              <div></div>
            </div>
          </div>
      );
    }
}