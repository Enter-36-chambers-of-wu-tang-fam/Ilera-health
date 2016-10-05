import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Medication from '../../components/medication-dash/meds-page/medication-class.jsx';


class MedicationDetail extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
          { this.props.chosenMed ? this.props.chosenMed.dosage : "YOLO!"}
      </div>
    );
  }
}




export default connect(state => ({
  chosenMed: state.meds.chosenMed
}))(MedicationDetail)
