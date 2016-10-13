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
    <input
      {...field.input}
      type={field.type}
      onChange={field.onChange}
      value={field.value}
      placeholder={field.placeholder}
    />
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">
       {field.meta.error}
     </span>}
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

    if(this.props.userType === 'physician'){
      this.props.getMyPatients(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      patients: this.props.myPatients
    })
  }

  render() {
    return (
      <div>
      <div className="allPhysicians">
        <ul className="myPhysicianList">
          <h2> My Patients</h2>
        </ul>

        <ul className="allPhysicianList">
          {this.state.patients.map((patient,index) => {
            return (
              <li
                key={index}>
                <Link to={"/provider/patients/"+patient.id}
                >
                <div
                  className="physicianImageWrap">
                  <img
                    className="physicianImage"
                    src={doc.image}
                  />
                </div>
                <p
                  className="physicianInfo">
                  {patient.first} {patient.last}
                </p>
                <br/>
                <p
                  className="physicianSpecialty">
                  {patient.date_of_birth}
                </p>
                <br/>
                <p
                  className="physicianSpecialty"
                >
                  {patient.city}, {patient.state}
                </p>
                </Link>
              </li>
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
    myPatients: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPatients: (physician) => dispatch(fetchMyPhysicians(physician))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
