import React, { Component, PropTypes } from 'react';
import MedsContainer from '../../containers/medication/medication-container.js';
import axios from 'axios'

export default class Medication extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      uid: '',
      meds: props.meds,
      chosenMed: '',
      infoChosenMed: {}
    };


  }
  render() {
    return(
      <ul>
        {this.state.meds.map(medication=>{
          return ( <li>
            {medication}
          </li> )
        })}
      </ul>
    );
  }



}
