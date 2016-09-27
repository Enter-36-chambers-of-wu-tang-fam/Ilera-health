import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class GeneralAuthentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(this.props.authentication !== null && this.props.userType !== null){
        if(this.props.userType === 'physician') this.context.router.push('/provider/dashboard');
        if(this.props.userType === 'patient') this.context.router.push('/patient/dashboard');
      } 
    }

    componentWillUpdate(nextProps) {      
      if(nextProps.authentication !== null && nextProps.userType !== null){
        if(nextProps.userType === 'physician') this.context.router.push('/provider/dashboard');
        if(nextProps.userType === 'patient') this.context.router.push('/patient/dashboard');
      } 
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

function mapStateToProps(state){
  return {
    authentication: state.authentication.authenticated,
    userType: state.authentication.userType
  }
}

  return connect(mapStateToProps)(GeneralAuthentication);
}