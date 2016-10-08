import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

// Components
import DashboardMessages from './provider-dash-messages.jsx';
import DashboardPatients from './provider-dash-patients.jsx';
import DashboardMain from './provider-dash-main.jsx';
import DashboardProfile from './provider-dash-profile.jsx';
import DashboardWelcome from './provider-dash-welcome.jsx';


class ProviderDashboard extends Component {

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
          <div className="providerDashParent clearfix">
            <div className="providerDashMain clearfix" style={{ minHeight: windowHeight}}>
              <DashboardMain />
            </div>

            <div className="providerDashRight" style={{ minHeight: windowHeight}}>
              <DashboardWelcome />
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

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(null, mapDispatchToProps)(ProviderDashboard);
