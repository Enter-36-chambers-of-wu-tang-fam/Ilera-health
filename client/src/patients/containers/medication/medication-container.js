// Parent container of patient med views
// React / Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { router } from 'react-router';
// Crypto
import CryptoJS from 'crypto-js';
// Actions
import * as actions from '../../actions/medication.js';
// Components
import Medication from '../../components/medication-dash/meds-page/medication-class.jsx';


class MedsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid: '',
      meds: [],
      chosenMed: '',
      infoChosenMed: {}
    };
  }

  // get all of patients meds
  componentWillMount(){
    const { dispatch } = this.props;
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    const uid = code.toString(CryptoJS.enc.Utf8);
    dispatch(actions.getAllPatientMedication(uid));
  }

  // set state to re-render with new info
  componentWillReceiveProps(nextProps){
    this.setState({
      meds:nextProps.meds,
      chosenMed:nextProps.chosenMed
   });
  }

  render(){
    return (
      <div className="patientMeds">
        <Medication
          chosenMed={this.state.chosenMed}
          meds={this.state.meds}
        />
      </div>
    );
  }
};

// get patient medications and details of medication user clicked
export default connect(state => ({
  meds: state.meds.medication,
  chosenMed: state.meds.chosenMed
}))(MedsContainer);