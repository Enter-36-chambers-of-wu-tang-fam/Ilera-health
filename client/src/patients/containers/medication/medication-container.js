import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import {  } from '.././reducers/medication-reducer.js';
import * as actions from '../actions/medication.js';
import Medication from '../components/patient-app/medication-dash/medication-class.jsx';
import { router } from 'react-router';

class MedsContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      uid: '',
      meds: ['hello people'],
      chosenMed: '',
      infoChosenMed: {}
    };

  }
  componentWillMount(){
    // dispatch(actions.getAllPatientMediaction(this.state.uid));

  }



  componentWillReceiveProps(nextProps){
    this.setState({meds:nextProps.meds})
  }

  render(){
    console.log(this.state.meds)
    return (
      <Medication

        meds={this.state.meds}
        />

    );
  }
}

// getAllPatientMediaction
export default connect(state => ({
  meds: ['meds are here'],
  chosenMed: state.chosenMed,
  infoChosenMed: state.infoChosenMed
}))(MedsContainer)
