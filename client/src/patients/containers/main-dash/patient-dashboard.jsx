import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../../actions/user.js';
import CryptoJS from 'crypto-js';

// Components
import DashboardMessages from '../../components/main-dash/dashboard-messages.jsx';
import DashboardRecords from '../../components/main-dash/dashboard-records.jsx';
import DashboardPhysicians from '../../components/main-dash/dashboard-physicians.jsx';
import DashboardMain from '../../components/main-dash/dashboard-main.jsx';
import DashboardProfile from '../../components/main-dash/dashboard-profile.jsx';
import DashboardHealthLog from '../../components/main-dash/dashboard-healthLog.jsx';
import DashboardMeds from '../../components/main-dash/dashboard-meds.jsx';

class PatientDashboard extends Component {

    constructor (props){
      super(props)
    }

    componentDidMount(){
      const { dispatch, getUserInfo } = this.props;
      let id = localStorage.getItem('uid');
      let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
      const uid = code.toString(CryptoJS.enc.Utf8);
      console.log("HERE")
      getUserInfo(uid);
    }

    render() {
      return (
          <div className="patientDash clearfix">
            <div className="dashboardRows clearfix">
              <DashboardMain />
            </div>

            <div className="dashboardRows bottomRow clearfix">
              <Link to='/patient/records'>
                <DashboardRecords />
              </Link>
              <Link to='/patient/messages'>
                <DashboardMessages />
              </Link>
              <Link to='/patient/physicians'>
                <DashboardPhysicians />
              </Link>
              <Link to='/patient/medications'>
                <DashboardMeds />
              </Link>
              <Link to='/patient/healthLog'>
                <DashboardHealthLog />
              </Link>

              <Link to='/patient/profile'>
                <DashboardProfile />
              </Link>

            </div>
          </div>
      );
    }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserInfo }, dispatch);
}

export default connect(null, mapDispatchToProps)(PatientDashboard);
