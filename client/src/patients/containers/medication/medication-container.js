import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import {  } from '.././reducers/medication-reducer.js';
import CryptoJS from 'crypto-js';
import * as actions from '../../actions/medication.js';
import Medication from '../../components/medication-dash/meds-page/medication-class.jsx';

import { router } from 'react-router';

class MedsContainer extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      uid: '',
      meds: [],
      chosenMed: '',
      infoChosenMed: {}
    };

  }
  componentWillMount(){
    const { dispatch } = this.props;
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    const uid = code.toString(CryptoJS.enc.Utf8);
    dispatch(actions.getAllPatientMedication(uid));

  }



  componentWillReceiveProps(nextProps){
    this.setState({
      meds:nextProps.meds,
      chosenMed:nextProps.chosenMed
  })
  }

  render(){
    console.log(this.state.meds)
    return (
      <div>
        <Medication
        chosenMed={this.state.chosenMed}
        meds={this.state.meds}
        />
      </div>

    );
  }
}

// getAllPatientMedication
export default connect(state => ({
  meds: state.meds.medication,
  chosenMed: state.meds.chosenMed
}))(MedsContainer)
