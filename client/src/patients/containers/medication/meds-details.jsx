// Patient view of medication details that shows on click 
// React / Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
// Components
import Medication from '../../components/medication-dash/meds-page/medication-class.jsx';


class MedicationDetail extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    const { chosenMed } = this.props;

    if(chosenMed.first){
      return (
      <div>
        <ul>
          <li>
            <h3><i className="fa fa-calendar-check-o" aria-hidden="true"></i> Start</h3>
            { chosenMed.start_date ?
              chosenMed.start_date.slice(0,10) :
              "No data" }
          </li>
          <li>
            <h3><i className="fa fa-calendar-times-o" aria-hidden="true"></i>End</h3>
            { chosenMed.end_date ?
              chosenMed.end_date.slice(0,10) :
              "No data" }
          </li>
          <li>
            <h3><i className="fa fa-balance-scale" aria-hidden="true"></i>Dosage</h3>
            { chosenMed.dosage ?
              chosenMed.dosage :
              "No data" }
          </li>
          <li className="prescriber">
            <h3><i className="fa fa-user-md" aria-hidden="true"></i>Prescriber</h3>
            <img src={ chosenMed.photo_path ?
            chosenMed.photo_path :
            "No data" } />
            <Link to={`/patient/physicians/${chosenMed.betterDoctorUID}`}>
              <p>
                { chosenMed.first ?
                  `${chosenMed.first} ${chosenMed.last}` :
                  "No data" }
              </p>
            </Link>
            <h4>Specialty</h4>
            { chosenMed.specialty ?
              chosenMed.specialty :
              "No data" }
            <h4>Phone</h4>
            { chosenMed.phone_number ?
              chosenMed.phone_number :
              "No data" }
            <h4>Email</h4>
            { chosenMed.email ?
              chosenMed.email :
              "No data" }
          </li>
        </ul>
      </div>
      );
    }else{
      return (
        <div>
            <h3 className="click">Click on a medication</h3>
        </div>
      );
    }
  }
};

export default connect(state => ({
  chosenMed: state.meds.chosenMed
}))(MedicationDetail);