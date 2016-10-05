import React, { Component, PropTypes } from 'react';
import MedsContainer from '../../../containers/medication/medication-container.js';
import axios from 'axios';

export default class Medication extends Component {
  constructor(props){
    super(props);
    console.log(props);
    // this.state = {
    //   uid: '',
    //   meds: props.meds,
    //   chosenMed: '',
    //   infoChosenMed: {}
    // };
  }
  
  render() {
    console.log("meds class", this.props.meds)
    return(
      <ul>
        {this.props.meds.map(medication=>{
          return ( <li key={medication.id}>

            {medication.drug_name}
          </li> )
        })}
      </ul>
    );
  }



}
