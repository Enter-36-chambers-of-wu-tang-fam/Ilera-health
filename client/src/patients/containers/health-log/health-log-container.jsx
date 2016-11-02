import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { router } from 'react-router';
// Crypto
import CryptoJS from 'crypto-js';
import * as actions from '../../actions/health-log.js';


class HealthLogContainer{
  constructor(props){
    super(props)
    this.state = {
      uid: '',
      Logs: [],
      chosenLog: '',
      infoChosenLog: {}
    }
  }
  const { dispatch } = this.props;
  let id = localStorage.getItem('uid');
  let code  = CryptoJS.AES.decrypt(id.toString(), 'key');
  const uid = code.toString(CryptoJS.enc.Utf8);
  dispatch(actions.getAllPatientMedication(uid));

  componentWillMount(){
    const { dispatch } = this.props;
    let id = localStorage.getItem('uid');
    let code = CryptoJS.AES.decrypt(id.toString(), 'key');
    const uid = code.toString(CryptoJS.enc.Utf8);
    dispatch(actions.fetchAllHealhlogsPatient(uid))
  }

  componentWillReceiveProps(nextProps){

  }

  render(){
    return (

    )
  }
}
