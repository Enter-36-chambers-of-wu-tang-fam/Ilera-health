import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Medication from '../../components/medication-dash/meds-page/medication-class.jsx';


class MedicationDetail extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <ul>
        <li>
          { this.props.chosenMed ?
            this.props.chosenMed.start_date :
            "We Cannot provide you with any information at this time" }
        </li>
        <li>
          { this.props.chosenMed ?
            this.props.chosenMed.end_date :
            "We Cannot provide you with any information at this time" }
        </li>
        <li>
          { this.props.chosenMed ?
            this.props.chosenMed.dosage :
            "We Cannot provide you with any information at this time" }
        </li>

      </ul>
    );
  }
}




export default connect(state => ({
  chosenMed: state.meds.chosenMed
}))(MedicationDetail)
