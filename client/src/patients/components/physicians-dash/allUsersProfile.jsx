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

  componentWillMount() {

    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let that = this;
    if(this.props.userType === 'patient'){
          let query = `https://api.betterdoctor.com/2016-03-01/doctors/${this.props.params.provider}?user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
          axios.get(query)
            .then(doctor => {
              that.setState({
                doc: doctor.data || null,
                title: doctor.data.data.profile.title || null,
                name: doctor.data.data.profile.first_name + ' ' + doctor.data.data.profile.last_name || null,
                first: doctor.data.data.profile.first_name || null,
                last: doctor.data.data.profile.last_name || null,
                image: doctor.data.data.profile.image_url || null,
                gender: doctor.data.data.profile.gender || null,
                bio: doctor.data.data.profile.bio ? doctor.data.data.profile.bio : null,
                specialties: doctor.data.data.specialties ? doctor.data.data.specialties : null,
                language: doctor.data.data.profile.languages[0].name ? doctor.data.data.profile.languages[0].name : null,
                practices: doctor.data.data.practices,
                practice_street: doctor.data.data.practices[0].visit_address.street ? doctor.data.data.practices[0].visit_address.street : null,
                practice_city:doctor.data.data.practices[0].visit_address.city ? doctor.data.data.practices[0].visit_address.city : null,
                practice_state:doctor.data.data.practices[0].visit_address.state ? doctor.data.data.practices[0].visit_address.state : null,
                practice_zip:doctor.data.data.practices[0].visit_address.zip ? doctor.data.data.practices[0].visit_address.zip : null,
                insurance_one: doctor.data.data.insurances[0].insurance_provider.name ? doctor.data.data.insurances[0].insurance_provider.name : null,
                insurance_two: doctor.data.data.insurances[1].insurance_provider.name ? doctor.data.data.insurances[1].insurance_provider.name : null,
              });
            })
            .catch(err => { console.log("ERROR FETCHING DOCTOR INFO", err) })

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
    {console.log("STATESTATESTATE", this.state)}
    {console.log("PROPSPROPSPROPS", this.props)}
      return (

          <div>
            <div className="searchProfile">
            <div className="searchProfileHeader">
              <img src={this.state.image} />
              <p className="physicianProfileTitle">{this.state.name}, {this.state.title}</p>
            
              { this.state.relationship ? <button className="removePhysicianButton" onClick={this.removeRelation.bind(this)}>Remove Physician</button> :  <button className="addPhysicianButton" onClick={this.createRelation.bind(this)}>Add Physician</button>}
              { this.state.relationship ? <Link to={"/patient/physicians/"+this.props.params.provider+"/calendar"}><button className="appointmentButton"><i className="fa fa-calendar" aria-hidden="true"></i>Appointments</button></Link> : ''}
                            
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
    getMyPhysicians: (patient) => dispatch(fetchMyPhysicians(patient)),
    getMyRelation: (relationship) => dispatch(checkMyRelationship(relationship)),
    addPhysician: (makeRelationship) => dispatch(makeMyPhysician(makeRelationship)),
    removePhysician: (endRelationship) => dispatch(removeRelationship(endRelationship))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
