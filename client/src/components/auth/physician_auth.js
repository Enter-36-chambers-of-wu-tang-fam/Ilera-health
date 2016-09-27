import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class PatientAuthentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authentication){
        this.context.router.push('/');
      } 

      if(this.props.authentication === null || this.props.authentication === undefined ||  this.props.userType !== "physician"){
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authentication){
        this.context.router.push('/');
      } 
      
      if(nextProps.authentication === null || nextProps.authentication === undefined ||  nextProps.userType !== "physician"){
        this.context.router.push('/');
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

  return connect(mapStateToProps)(PatientAuthentication);
}