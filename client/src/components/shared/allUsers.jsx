import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

const getPhysicians = '/api/patient/getallphy';
const getPatients = '/api/physician/patients';
   

//  console.log(navigator.geolocation.getCurrentPosition(cb));
//  Figure out the child paths             {this.props.children}

class AllUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      doctors: [],   
      doctor_first: null,
      doctor_last: null,
      doctor_query: null,
      doctor_gender: null,
      doctor_sort: null,
      doctor_limit: null,
      lat: undefined,
      lon: undefined,
      
      
      patients: [],
      patient_first: null,
      patient_last: null,
      patient_gender: null,
      patient_sort: null,
      patient_limit: null,
      patient_location:null,


      
    }
  }

  componentWillMount() {
    let that = this;

    // PATIENT VIEW OF ALL PHYSICIANS

    if(this.props.userType === 'patient'){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          console.log("Got Locations", lat, lon)
          let query = `https://api.betterdoctor.com/2016-03-01/doctors?location=${lat}%2C${lon}%2C100&user_location=${lat}%2C${lon}&skip=0&limit=50&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
          axios.get(query)
            .then(result => {
              let docs = [];
              result.data.data.map(doctor => {
                docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title, image: doctor.profile.image_url});
              })
              that.setState({doctors: docs});
            })
            .catch(err => { console.log("ERROR FETCHING DOCTOR INFO", err) })
        })
      } 
    } else {
        this.setState({docs: []});
    }

    //PHYSICIAN VIEW OF ALL PATIENTS

    if(this.props.userType === 'physician'){
      

    }
  }
  
      

  render() {
    const { handleSubmit } = this.props;
    {console.log(this.props)}
      return (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">Doctors First Name</label>
                <Field name="firstName" component="input" type="text"/>
              </div>
              <div>
                <label htmlFor="lastName">Doctors Last Name</label>
                <Field name="lastName" component="input" type="text"/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email"/>
              </div>
                <button type="submit">Submit</button>
            </form>
          </div>
      );
    }
};

const mapStateToProps = (state) => {
  return {
    userType: state.authentication.userType
  }
}


AllUsers = reduxForm({
  form: 'GetAll' // a unique name for this form
},mapStateToProps)(AllUsers);

export default AllUsers;



// export default connect(mapStateToProps)(AllUsers);







// prior working form

// export default class AllUsers extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       doctors: [],   
//       lat: null,
//       lon: null
//     }
//   }
//   componentWillMount() {
//     let that = this;
//     navigator.geolocation.getCurrentPosition(function(position) {
//       that.setState({lat: position.coords.latitude.toFixed(3)});
//       that.setState({lon: position.coords.longitude.toFixed(3)});
//     });
    
//     if(navigator.geolocation){
//       let query = `https://api.betterdoctor.com/2016-03-01/doctors?location=${this.state.lat}%2C${this.state.lon}%2C100&user_location=${this.state.lat}%2C${this.state.lon}&skip=0&limit=10&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
//         axios.get(query)
//         .then( result => {
//           var docs = [];
//           result.data.data.map( doctor => {
//             docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title, image: doctor.profile.image_url});
//           })
//           this.setState({docs: docs});
//         })
//         .catch(err => { console.log("ERROR FETCHING DOCTOR INFO") })
//     }else{
//       this.setState({docs: []});
//     }
//   }

//   render() {
//     { console.log(this.state.docs) }
//       return (
//           <div>
//           Hello from allUsers!
//           {this.state.docs.map(function(doc){ 
//             return <img src={doc.image} width="200px" />
//           })}
//           </div>
//       );
//     }
// }

