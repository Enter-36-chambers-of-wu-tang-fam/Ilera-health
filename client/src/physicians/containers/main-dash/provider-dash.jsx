// parent component for provider Dashboard
// React / Component
import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
// Actions
import { getAllPhysicianAppts } from '../../actions/appointment.js';
// Components
import DashboardMessages from '../../components/main-dash/provider-dash-messages.jsx';
import DashboardPatients from '../../components/main-dash/provider-dash-patients.jsx';
import DashboardMain from './provider-dash-main.jsx';
import DashboardProfile from '../../components/main-dash/provider-dash-profile.jsx';
import DashboardWelcome from '../../components/main-dash/provider-dash-welcome.jsx';
// Other
import CryptoJS from 'crypto-js';

class ProviderDashboard extends Component {

  constructor (props){
    super(props);
    this.state = {
        windowHeight: ''
    }
  }

  componentWillMount() {
    const { loadAppointments } = this.props;
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    loadAppointments(uid);
    this.setState({windowHeight: window.innerHeight });
  }

  render() {
    const { windowHeight } = this.state;
    const { appointments, user } = this.props;
    return (
      <div
        className="providerDashParent clearfix"
      >
        <div
          className="providerDashMain clearfix"
          style={{ minHeight: windowHeight}}
        >
          <DashboardMain
            appointments={appointments}
          />
        </div>
        <div
          className="providerDashRight"
          style={{ minHeight: windowHeight}}
        >
          <DashboardWelcome user={user}/>
          <Link to='/provider/patients'>
            <DashboardPatients />
          </Link>
          <Link to='/provider/messages'>
            <DashboardMessages />
          </Link>
          <Link to='/provider/profile'>
            <DashboardProfile />
          </Link>
        </div>
      </div>
    );
  }
};

export default connect(
  state => ({
		appointments: state.allPhysicianAppointments
  }),
  {
		loadAppointments: getAllPhysicianAppts
  }
)(ProviderDashboard);
