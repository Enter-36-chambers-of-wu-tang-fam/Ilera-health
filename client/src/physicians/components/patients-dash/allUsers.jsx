import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchMyPatients } from '../../actions/contacts';
import CryptoJS from 'crypto-js';


const getPatients = '/api/physician/patients';

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type} onChange={field.onChange} value={field.value} placeholder={field.placeholder}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>


class AllUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      patients: [],
    }
  }

  componentWillMount() {
    let that = this;
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    console.log("UID",uid);
    console.log("LocalStorage",localStorage);
    if(this.props.userType === 'physician'){
      this.props.getMyPatients(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      patients: nextProps.myPatients
    })
  }

  render() {
    {console.log("STATE", this.state)}
      return (
        <div>
        <div className="allPatients">
          <ul className="myPatientList">
            <h2> My Patients</h2>
          </ul>

          <ul className="allPatientList">
            {this.state.patients.map((patient,index) => {
              return (
                <li key={index}><Link to={"/provider/patients/"+patient.id}>
                <div className="patientImageWrap"><img className="patientImage" src={patient.photo_path ? patient.photo_path : ""} /></div>
                <p className="patientInfo">{patient.first} {patient.last}</p>
                <br/>
                <p className="patientSpecialty">{patient.date_of_birth ? patient.date_of_birth.slice(0,11) : ""}</p>
                <br/>
                <p className="patientSpecialty">{patient.city ? patient.city : ""} {patient.state ? "," + patient.state : ""}</p>
                </Link></li>
              )
            })}
          </ul>
        </div>
        </div>
      );
    }
};

const mapStateToProps = (state) => {
  return {
    userType: state.authentication.userType,
    myPatients: state.contacts.contacts.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPatients: (physician) => dispatch(fetchMyPatients(physician))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
