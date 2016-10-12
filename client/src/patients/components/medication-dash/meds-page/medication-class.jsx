// React / Redux
import React, { Component, PropTypes } from 'react';
// Components
import MedsContainer from '../../../containers/medication/medication-container.js';
import MedicationList from '../../../containers/medication/meds-list.jsx';
import MedicationDetail from '../../../containers/medication/meds-details.jsx';

export default class Medication extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <MedicationList
          meds={this.props.meds}
          />
        <MedicationDetail
          chosenMed={this.props.chosenMed}
          />
      </div>
    );
  }

};