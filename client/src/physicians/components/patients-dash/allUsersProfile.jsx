import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
import { fetchMyPhysicians, makeMyPhysician, checkMyRelationship, removeRelationship } from '../../actions/contacts.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';



class ViewProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      patient: {},
      relationship:false
    }
  }

  componentWillMount() {

    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let relation = {id_patient: this.props.params.patient, betterDocId: uid}; //Need to reframe backend for physician id and not just better doc Id
    
    this.props.getMyRelation(relation);


  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      relationship: nextProps.relation
    })
  }

  removeRelation() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let deleteRelationship = {
      betterDocId: this.props.params.provider,
      id_patient: uid 
    };
    
    this.props.removePatient(deleteRelationship);
    this.props.getMyRelation(deleteRelationship);
  }

  render() {
      return (

          <div>
            <div className="searchProfile">
            <div className="searchProfileHeader">
              <img src={this.state.patient.photo_path} />
              <p className="physicianProfileTitle">{this.state.patient.fist} {this.state.patient.last}</p>
            
              { <button className="removePhysicianButton" onClick={this.removeRelation.bind(this)}>Remove Physician</button>}
              { this.state.relationship ? <Link to={"/patient/physicians/"+this.props.params.provider+"/calendar"}><button className="appointmentButton"><i className="fa fa-calendar" aria-hidden="true"></i>Appointments</button></Link> : ''}
                            
            </div>
              
              <p className="physicianProfileBio">
              <br/>
                {this.state.bio}
              </p>
              <p className="physicianProfileLanguage"><b>Language:</b> {this.state.language}</p>
              <br />
              <span className="headers"><i className="fa fa-building-o fa-2x" aria-hidden="true"></i>Practice</span>
              <hr />

              <br />
              <p className="physicianProfileStreet">{this.state.practice_street}</p>
              <p className="physicianProfileCity">{this.state.practice_city}</p>
              <p className="physicianProfileState">{this.state.practice_state ? this.state.practice_state : null}, {this.state.practice_zip ? this.state.practice_zip : null}</p>
              <br />
              <span className="headers"><i className="fa fa-umbrella fa-2x" aria-hidden="true"></i>Insurance</span>
              <hr />
              <br />
              <p className="physicianProfileInsuranceOne"><b>Insurance:</b> {this.state.insurance_one ? this.state.insurance_one : null}</p>
              <p className="physicianProfileInsuranceTwo"><b>Insurance:</b> {this.state.insurance_two ? this.state.insurance_two : null}</p>


              <div className="appointment">
                {this.props.children}
              </div>
            </div>
          </div>
      );
    }
};
const mapStateToProps = (state) => {
  return {
    uid: state.authentication.authenticated,
    userType: state.authentication.userType,
    relation: state.contacts.relation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyRelation: (relationship) => dispatch(checkMyRelationship(relationship)),
    removePatient: (endRelationship) => dispatch(removeRelationship(endRelationship))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
