// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js';

class PatientApp extends Component {
  constructor(props) {
    super(props);
  }
  
  static contextTypes = {
      router: React.PropTypes.object
  }

  logOut() {
    localStorage.removeItem('uid');          
    localStorage.removeItem('userType');
  }

  render(){
    return (
      <div>
      <a href="#" onClick={this.logOut}>Click to be able to return to signIn page (find me in patient-app)</a>
        { this.props.children }
      </div>
    ); 
  }
};

function mapStateToProps(state){
  return {authenticated: state.authenticated}
}

export default connect(mapStateToProps)(PatientApp);