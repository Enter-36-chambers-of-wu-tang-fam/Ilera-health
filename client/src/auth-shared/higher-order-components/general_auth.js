import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnauthHeader from '../components/unauth-header.jsx';

export default function (ComposedComponent) {
  class GeneralAuthentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(this.props.authentication !== null && this.props.userType !== null){
        if(this.props.userType === 'physician') this.context.router.push('provider/dashboard');
        if(this.props.userType === 'patient') this.context.router.push('patient/dashboard');
        if(this.props.userType === 'staff') this.context.router.push('staff/dashboard');
      }
    }

    componentWillUpdate(nextProps) {  
      if(nextProps.signUp === true){
        if(nextProps.userType === 'physician') this.context.router.push('/provider/welcome');
        if(nextProps.userType === 'patient') this.context.router.push('/patient/form');
        if(nextProps.userType === 'staff') this.context.router.push('/staff/form');
      }
      else if(nextProps.authentication !== null && nextProps.userType !== null){
        if(nextProps.userType === 'physician') this.context.router.push('provider/dashboard');
        if(nextProps.userType === 'patient') this.context.router.push('patient/dashboard');
        if(nextProps.userType === 'staff') this.context.router.push('staff/dashboard');
      }
    }

    render() {
      return (
        <div>
          <UnauthHeader />
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }

function mapStateToProps(state){
  return {
    authentication: state.authentication.authenticated,
    signUp: state.authentication.signUp,
    userType: state.authentication.userType,
  }
}

  return connect(mapStateToProps)(GeneralAuthentication);
}
