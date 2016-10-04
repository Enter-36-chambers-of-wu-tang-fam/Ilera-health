import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
import { fetchMyPhysicians, makeMyPhysician, removeRelationship } from '../../actions/contacts.js'
import CryptoJS from 'crypto-js';
import axios from 'axios';

class ViewProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      allDocs: [],   
      doc: {},
      title: null,
      name: null,
      image: null,
      gender: null,
      bio: null,
      specialties: [],
      ratings: [],
      languages: [],
      practices: [],
      insurances: []
           
    }
  }

  componentWillMount() {
    
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    this.props.getMyPhysicians('uid');

    let that = this;
    if(this.props.userType === 'patient'){
          let query = `https://api.betterdoctor.com/2016-03-01/doctors/${this.props.params.provider}?user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
          console.log(query);
          axios.get(query)
            .then(doctor => {
              that.setState({
                doc: doctor.data,
                title: doctor.data.data.profile.title,
                name: doctor.data.data.profile.first_name + ' ' + doctor.data.data.profile.last_name,
                image: doctor.data.data.profile.image_url,
                gender: doctor.data.data.profile.gender,
                bio: doctor.data.data.profile.bio,
                specialties: doctor.data.data.specialties,
                ratings: doctor.data.data.ratings,
                languages: doctor.data.data.profile.languages,
                practices: doctor.data.data.practices,
                insurances: doctor.data.data.insurances
              });
            })
            .catch(err => { console.log("ERROR FETCHING DOCTOR INFO", err) }) 

          if(this.props.relationship){

          }
      
    }else {
        this.setState({doc: {}});
    } 

    //PHYSICIAN VIEW OF ALL PATIENTS

    if(this.props.userType === 'physician'){
      

    }
  }

  createRelation() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    let relationship = {
      id_physician: 1,
      id_patient: uid 
    };
    this.props.addPhysician(relationship);
    this.props.getMyPhysicians(uid);
  }  

  removeRelation() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let relationship = {
      id_physician: 1,
      id_patient: uid 
    };
    this.props.removePhysician(relationship);
    //this.props.getMyPhysicians(uid);
  } 

  render() {
    console.log("STATA", this.state)
      return (
        
          <div>
            <div className="searchProfile">
              <img src={this.state.image} />
              <p className="searchProfileTitle">{this.state.name}, {this.state.title}</p>
              <p className="SearchProfileText">{this.state.bio}</p>
              <button onClick={this.createRelation.bind(this)}>Add Physician</button>
              <button onClick={this.removeRelation.bind(this)}>Remove Physician</button>
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
    getMyPhysicians: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPhysicians: (patient) => dispatch(fetchMyPhysicians(patient)),
    addPhysician: (relationship) => dispatch(makeMyPhysician(relationship)),
    removePhysician: (relationship) => dispatch(removeRelationship(relationship))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);





