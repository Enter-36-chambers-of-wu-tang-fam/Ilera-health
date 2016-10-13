// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../auth-shared/actions/actions.js';
// Components
import Signin from '../../auth-shared/components/signin-component.jsx';
import Header from '../../auth-shared/components/header.jsx';
// PatientApp


class StaffApp extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
      router: React.PropTypes.object
  }

  render(){
    return (
      <div>
        <Header />
        <main className="patientAppMain">
          { this.props.children }
        </main>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {authenticated: state.authenticated}
}

export default connect(mapStateToProps)(StaffApp);
