import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

// Components
import DashboardMessages from './staff-dash-messages.jsx';
import DashboardPatients from './staff-dash-patients.jsx';
import DashboardMain from './staff-dash-main.jsx';
import DashboardProfile from './staff-dash-profile.jsx';
import DashboardWelcome from './staff-dash-welcome.jsx';


class StaffDashboard extends Component {

  constructor (props){
    super(props);
    this.state = {
        windowHeight: ''
    }
  }

  componentWillMount() {
	this.setState({windowHeight: window.innerHeight });
	}

  render() {
    const { windowHeight } = this.state;
    return (
      <div
        className="providerDashParent clearfix"
      >
        <div
          className="providerDashMain clearfix"
          style={{ minHeight: windowHeight}}
        >
          <DashboardMain />
        </div>

        <div
          className="providerDashRight"
          style={{ minHeight: windowHeight}}
        >
          <DashboardWelcome />
          <Link to='/staff/patients'>
            <DashboardPatients />
          </Link>
          <Link to='/staff/messages'>
            <DashboardMessages />
          </Link>
          <Link to='/staff/profile'>
            <DashboardProfile />
          </Link>

        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(null, mapDispatchToProps)(StaffDashboard);
