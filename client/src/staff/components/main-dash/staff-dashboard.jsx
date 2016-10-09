import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUserInfo } from '../../actions/user.js';
import CryptoJS from 'crypto-js';

// Components
// import DashboardMessages from './dashboard-messages.jsx';
// import DashboardRecords from './dashboard-records.jsx';
// import DashboardPhysicians from './dashboard-physicians.jsx';
// import DashboardMain from './dashboard-main.jsx';
// import DashboardProfile from './dashboard-profile.jsx';
// import DashboardHealthLog from './dashboard-healthLog.jsx';
// import DashboardMeds from './dashboard-meds.jsx';

class StaffDashboard extends Component {

    constructor (props){
      super(props)
    }

    // componentDidMount(){
    //   const { dispatch, getUserInfo } = this.props;
    //   let id = localStorage.getItem('uid');
    //   let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    //   const uid = code.toString(CryptoJS.enc.Utf8);
    //   console.log("HERE")
    //   getUserInfo(uid);
    // }

    render() {
      return (
          <div className="patientDash clearfix">
            <div className="patientDash clearfix">
              <p>hello staff dash</p>
            </div>
          </div>
      );
    }
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ getUserInfo }, dispatch);
// }

// export default connect(null, mapDispatchToProps)(StaffDashboard);
export default connect(null)(StaffDashboard);
