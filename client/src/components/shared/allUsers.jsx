import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

const getPhysicians = '/api/patient/getallphy';
const getPatients = '/api/physician/patients';
   
// var specialties = [ 'Allergist',
//   'Anesthesiologist',
//   'Cardiologist',
//   'Cardiothoracic Surgeon',
//   'Colorectal Surgeon',
//   'Critical Care Doctor',
//   'Dentistry',
//   'Dermatologist',
//   'Doctor',
//   'Ear, Nose and Throat Doctor',
//   'Emergency Medicine Doctor',
//   'Endocrinologist',
//   'Eye Doctor',
//   'Gastroenterologist',
//   'General Surgeon',
//   'Geneticist',
//   'Geriatric Medicine Doctor',
//   'Hospice Care and Palliative',
//   'Infectious Disease Doctor',
//   'Nephrologist',
//   'Neurologist',
//   'Neuromusculoskeletal Medicine',
//   'Neurosurgeon',
//   'Nuclear Medicine Doctor',
//   'Nurse Practicioner',
//   'OBGYN',
//   'Oncologist',
//   'Opthalmologist',
//   'Optometrist',
//   'Oral Surgeon',
//   'Orthopedic Surgeon',
//   'Pain Management Doctor',
//   'Pathologist',
//   'Pediatric Surgeon',
//   'Pediatrics',
//   'Physiatrist',
//   'Physical Therapist',
//   'Plastic Surgeon',
//   'Podiatrist',
//   'Preventetive Medicine Doctor',
//   'Prmary Care Doctor',
//   'Psychiatrist',
//   'Psychiatrist',
//   'Psychologist',
//   'Psychologist',
//   'Pulmonologist',
//   'Radiologist',
//   'Sleep Medicine Doctor',
//   'Urologist',
//   'Vascular Surgeon' ]

//  console.log(navigator.geolocation.getCurrentPosition(cb));
//  Figure out the child paths             {this.props.children}

//BETTER DOCTOR ALL DOC REQUIREMENTS: At least one of the request parameters 'query', 'location', 'name', 'first_name', 'last_name' needs to be provided",

const renderInput = field => // Define stateless component to render input and errors
  <div>
    <input {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>


const renderSelect = field => // Define stateless component to render input and errors
  <div>
    <Select {...field.input}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>



class AllUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      docs: [],   
      doc_name: null,
      doc_specialty: null,
      doc_query: null,
      doc_gender: null,
      doc_sort: null,
      doc_limit: null,
      lat: undefined,
      lon: undefined,
      
      
      pats: [],
      pat_first: null,
      pat_last: null,
      pat_gender: null,
      pat_sort: null,
      pat_limit: null,
      pat_location:null,      
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
              that.setState({docs: docs});
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

  searchSubmit(search) {
    console.log(search);
  }

  handleDocQuery() {

  }

  handleDocName() {

  }

  handleDocSpecialty() {

  }

  handleDocGender() {

  }

  handleDocSort() {

  }

  handleState() {

  }

  handleCity() {

  }
  
      

  render() {
    const { handleSubmit } = this.props;
    {console.log(this.state)}
      return (
          <div>
            <form onSubmit={handleSubmit(props => this.searchSubmit(props))}>
              <div>
                <label htmlFor="docQuery">Search Physicians</label>
                <Field name="docQuery" type="text" value={this.state.doc_query} component={renderInput} onChange={this.handleDocQuery.bind(this)}/>
              </div>
              <div>
                <label htmlFor="docName">Provider Name</label>
                <Field name="docName" type="text" value={this.state.doc_name} component={renderInput} onChange={this.handleDocName.bind(this)}/>
              </div>
              <div>
                <label htmlFor="docSpecialty">Provider Specialty / Practice Type</label>
                  <Field name="docSpecialty" component="select" onChange={this.handleDocSpecialty.bind(this)}>
                    <option disabled>Specialty</option>
                    <option value="Allergist">Allergist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</option>
                    <option value="Colorectal Surgeon">Colorectal Surgeon</option>
                    <option value="Critical Care Doctor">Critical Care Doctor</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Ear, Nose and Throat Doctor">Ear, Nose and Throat Doctor</option>
                    <option value="Emergency Medicine Doctor">Emergency Medicine Doctor</option>
                    <option value="Endocrinologist">Endocrinologist</option>
                    <option value="Eye Doctor">Eye Doctor</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                    <option value="General Surgeon">General Surgeon</option>
                    <option value="Geneticist">Geneticist</option>
                    <option value="Geriatric Medicine Doctor">Geriatric Medicine Doctor</option>
                    <option value="Hospice Care and Palliative">Hospice Care and Palliative</option>
                    <option value="Infectious Disease Doctor">Infectious Disease Doctor</option>
                    <option value="Nephrologist">Nephrologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Neuromusculoskeletal Medicine">Neuromusculoskeletal Medicine</option>
                    <option value="Neurosurgeon">Neurosurgeon</option>
                    <option value="Nuclear Medicine Doctor">Nuclear Medicine Doctor</option>
                    <option value="Nurse Practicioner">Nurse Practicioner</option>
                    <option value="OBGYN">OBGYN</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Opthalmologist">Opthalmologist</option>
                    <option value="Optometrist">Optometrist</option>
                    <option value="Oral Surgeon">Oral Surgeon</option>
                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    <option value="Pain Management Doctor">Pain Management Doctor</option>
                    <option value="Pathologist">Pathologist</option>
                    <option value="Pediatric Surgeon">Pediatric Surgeon</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Physiatrist">Physiatrist</option>
                    <option value="Physical Therapist">Physical Therapist</option>
                    <option value="Plastic Surgeon">Plastic Surgeon</option>
                    <option value="Podiatrist">Podiatrist</option>
                    <option value="Preventetive Medicine Doctor">Preventetive Medicine Doctor</option>
                    <option value="Prmary Care Doctor">Prmary Care Doctor</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Psychologist">Psychologist</option>
                    <option value="Psychologist">Psychologist</option>
                    <option value="Pulmonologist">Pulmonologist</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Sleep Medicine Doctor">Sleep Medicine Doctor</option>
                    <option value="Urologist">Urologist</option>
                    <option value="Vascular Surgeon">Vascular Surgeon</option>
                </Field>
              </div>
              <div>
                <label htmlFor="docGender">Provider Gender</label>
                <Field name="docGender" component="select" onChange={this.handleDocGender.bind(this)}>
                    <option disabled>Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </Field>
              </div>
              <div>
                <label htmlFor="docSort">Sort By</label>
                  <Field name="docSort" component="select" onChange={this.handleDocSort.bind(this)}>
                    <option disabled>Sort</option>
                    <option value="full-name-asc">Name</option>
                    <option value="best-match-asc">best-match-asc</option>
                    <option value="best-match-desc">best-match-desc</option>
                    <option value="distance-asc">distance-asc</option>
                    <option value="distance-desc">distance-desc</option>
                    <option value="first-name-asc">first-name-asc</option>
                    <option value="first-name-desc">first-name-desc</option>
                    <option value="full-name-asc">full-name-asc</option>
                    <option value="full-name-desc">full-name-desc</option>
                    <option value="last-name-asc">last-name-asc</option>
                    <option value="last-name-desc">last-name-desc</option>
                    <option value="rating-asc">rating-asc</option>
                    <option value="rating-desc">rating-desc</option>
                  </Field>
              </div>
              <div>
                <label htmlFor="docState">State</label>
                <Field name="docState" component={renderInput} value={this.state.state} onChange={this.handleState.bind(this)} type="text"/>
              </div>
              <div>
                <label htmlFor="docCity">Philadelphia</label>
                <Field name="docCity" component={renderInput} value={this.state.city} onChange={this.handleCity.bind(this)} type="text"/>
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
})(AllUsers);


export default connect(mapStateToProps)(AllUsers);







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

