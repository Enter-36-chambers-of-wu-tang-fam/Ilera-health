import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Medication from './medication-class.jsx';


class MedicationDetail extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
          { this.props.chosenMed ? this.props.chosenMed.drug_name : "YOLO!"}
      </div>
    );
  }
}




export default connect(state => ({
  chosenMed: state.meds.chosenMed
}))(MedicationDetail)
