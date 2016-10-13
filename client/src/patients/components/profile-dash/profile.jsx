// React / Redux
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
// Axios
import axios from 'axios';


class ViewProfile extends Component {
  constructor(props){
    super(props);
    this.state = {   
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
    let that = this;
    if(this.props.userType === 'patient'){
          let query = `https://api.betterdoctor.com/2016-03-01/doctors/${this.props.params.provider}?user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
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
      
    } else {
        this.setState({doc: {}});
    }

    //PHYSICIAN VIEW OF ALL PATIENTS
    if(this.props.userType === 'physician'){
    }
  }  

  render() {
      return (
        
          <div>
            <div className="searchProfile">
              <img src={this.state.image} />
              <p className="searchProfileTitle">{this.state.name}, {this.state.title}</p>
              <p className="SearchProfileText">{this.state.bio}</p>
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
    userType: state.authentication.userType
  }
}

export default connect(mapStateToProps)(ViewProfile);