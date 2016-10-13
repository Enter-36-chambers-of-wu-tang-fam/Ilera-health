// React / Redux
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
// Actions
import { fetchMyPhysicians, makeMyPhysician, checkMyRelationship, removeRelationship } from '../../actions/contacts.js';
// Crypto
import CryptoJS from 'crypto-js';
import request from 'superagent';
// Axios
import axios from 'axios';


class ViewProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      allDocs: [],
      doc: {},
      title: null,
      first: null,
      last: null,
      name: null,
      image: null,
      gender: null,
      bio: null,
      specialties: [],
      language: null,
      practices: [],
      practice_street: null,
      practice_city: null,
      practice_state:null,
      practice_zip:null,
      insurance_one: null,
      insurance_two: null,
      relationship: false
    }
  }

  // get info from Better Doctor API
  componentWillMount() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let that = this;
    if(this.props.userType === 'patient'){
          let query = `https://api.betterdoctor.com/2016-03-01/doctors/${this.props.params.provider}?user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
          request.get(query)
          .end((err, doctor) => {
              if (err) { console.error(err) }
              that.setState({
                doc: doctor.body || null,
                title: doctor.body.data.profile.title || null,
                name: doctor.body.data.profile.first_name + ' ' + doctor.body.data.profile.last_name || null,
                first: doctor.body.data.profile.first_name || null,
                last: doctor.body.data.profile.last_name || null,
                image: doctor.body.data.profile.image_url || null,
                gender: doctor.body.data.profile.gender || null,
                bio: doctor.body.data.profile.bio ? doctor.body.data.profile.bio : null,
                specialties: doctor.body.data.specialties ? doctor.body.data.specialties : null,
                language: doctor.body.data.profile.languages[0].name ? doctor.body.data.profile.languages[0].name : null,
                practices: doctor.body.data.practices,
                practice_street: doctor.body.data.practices[0].visit_address.street ? doctor.body.data.practices[0].visit_address.street : null,
                practice_city:doctor.body.data.practices[0].visit_address.city ? doctor.body.data.practices[0].visit_address.city : null,
                practice_state:doctor.body.data.practices[0].visit_address.state ? doctor.body.data.practices[0].visit_address.state : null,
                practice_zip:doctor.body.data.practices[0].visit_address.zip ? doctor.body.data.practices[0].visit_address.zip : null,
                insurance_one: doctor.body.data.insurances[0].insurance_provider.name ? doctor.body.data.insurances[0].insurance_provider.name : null,
                insurance_two: doctor.body.data.insurances[1].insurance_provider.name ? doctor.body.data.insurances[1].insurance_provider.name : null,
              });
            })
            // .catch(err => { console.log("ERROR FETCHING DOCTOR INFO", err) })

    } else {
        this.setState({doc: {}});
    }

    //PHYSICIAN VIEW OF ALL PATIENTS
    let relation = {id_patient: uid, betterDocId: this.props.params.provider};
    
    this.props.getMyRelation(relation);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      relationship: nextProps.relation
    })
  }

  
  createRelation() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    let createRelationship = {
      betterDocId: this.props.params.provider,
      title: this.state.title,
      first: this.state.first,
      last: this.state.last,
      image: this.state.image,
      specialty: this.state.specialties[0].actor,
      phone: this.state.practices[0].phones[0].number,
      id_patient: uid
    };
    this.props.addPhysician(createRelationship);
    this.props.getMyRelation({id_patient: uid, betterDocId: this.props.params.provider});
    this.setState(this.state)
  }

  removeRelation() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let deleteRelationship = {
      betterDocId: this.props.params.provider,
      id_patient: uid 
    };
    
    this.props.removePhysician(deleteRelationship);
    this.props.getMyRelation(deleteRelationship);
  }

  render() {
      return (

          <div>
            <div className="searchProfile">
            <div className="searchProfileHeader">
              <img src={this.state.image} />
              <p className="physicianProfileTitle">{this.state.name}, {this.state.title}</p>
            
              { this.state.relationship ? <button className="removePhysicianButton" onClick={this.removeRelation.bind(this)}>Remove Physician</button> :  <button className="addPhysicianButton" onClick={this.createRelation.bind(this)}>Add Physician</button>}
              {this.state.relationship ? <span>{this.props.children}</span> : ''}
                            
            </div>
              
              <span className="headers"><i className="fa fa-user fa-2x" aria-hidden="true"></i>About</span>
              <hr />
              
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
                {this.state.relationship ? this.props.children : ''}
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
    getMyPhysicians: (patient) => dispatch(fetchMyPhysicians(patient)),
    getMyRelation: (relationship) => dispatch(checkMyRelationship(relationship)),
    addPhysician: (makeRelationship) => dispatch(makeMyPhysician(makeRelationship)),
    removePhysician: (endRelationship) => dispatch(removeRelationship(endRelationship))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);