import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { router } from 'react-router';
// Crypto
import CryptoJS from 'crypto-js';
import * as actions from '../../actions/health-log.js';


class HealthLogContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      Logs: [],
      chosenLog: '',
      infoChosenLog: {}
    }
  }

  // componentWillMount(){
  //   const { dispatch } = this.props;
  //   let id = localStorage.getItem('uid');
  //   let code = CryptoJS.AES.decrypt(id.toString(), 'key');
  //   const uid = code.toString(CryptoJS.enc.Utf8);
  //   dispatch(actions.fetchAllHealhlogsPatient(uid));
  // }

  // componentWillReceiveProps(nextProps){
  //
  // }

  render(){
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default connect(state => ({
  Logs: state.Logs
}))(HealthLogContainer);
