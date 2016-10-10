import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchMyPhysicians } from '../../actions/contacts';
import CryptoJS from 'crypto-js';

const getPhysicians = '/api/patient/getallphy';
const getPatients = '/api/physician/patients';

navigator.geolocation.getCurrentPosition(function(position){
   let lat = position.coords.latitude;
});

//BETTER DOCTOR ALL DOC REQUIREMENTS: At least one of the request parameters 'query', 'location', 'name', 'first_name', 'last_name' needs to be provided",

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
      docs: [],
      doc_name: null,
      doc_specialty: null,
      doc_query: null,
      doc_gender: null,
      doc_sort: null,
      doc_limit: null,
      doc_state:null,
      doc_city:null,
      lat: undefined,
      lon: undefined,
      practice_city: null,
      practice_state: null,

      currentDocs: [],

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
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    // PATIENT VIEW OF ALL PHYSICIANS -- Initialize to show physicians close to them
    this.props.getMyPhysicians(uid);

    if(this.props.userType === 'patient'){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          let query = `https://api.betterdoctor.com/2016-03-01/doctors?location=${lat}%2C${lon}%2C100&user_location=${lat}%2C${lon}&skip=0&limit=20&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
          axios.get(query)
            .then(result => {
              let docs = [];
              result.data.data.map((doctor,index) => {
                docs.push({
                  title: doctor.profile.title,
                  first_name: doctor.profile.first_name,
                  last_name: doctor.profile.last_name,
                  image: doctor.profile.image_url,
                  specialty: doctor.specialties,
                  bd_uid: doctor.uid,
                  practice_city: doctor.practices[0].visit_address.city ? doctor.practices[0].visit_address.city : null,
                  practice_state: doctor.practices[0].visit_address.state ? doctor.practices[0].visit_address.state : null
                });
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
    let that = this;
    let qName = this.state.doc_name ? `name=${this.state.doc_name}`:'';
    let qQuery = this.state.doc_query ? `&query=${this.state.doc_query}`:'';
    let qSpecialty = this.state.doc_specialty ? `&specialty_uid=${this.state.doc_specialty}` : '' ;
    let qLocation = (this.state.doc_state && this.state.doc_city) ? `&location=${this.state.doc_state}-${this.state.doc_city}`: '';
    let qGender =  this.state.doc_gender ? `&gender=${this.state.doc_gender}`: '';
    let qSort = this.state.doc_sort ? `&sort=${this.state.doc_sort}`: '';
    let qLimit = this.state.doc_limit ? `&limit=${this.state.doc_limit}`: '&limit=20'; //Let users set the limit ??
    let authKey = `&user_key=4cccf671bab24d87e0f4e4cad7dc0e29`;
    let query = `https://api.betterdoctor.com/2016-03-01/doctors?` + qName + qQuery + qSpecialty + qLocation + qGender + qSort + qLimit + authKey;
    console.log("QUERY",query);
      axios.get(query)
        .then(result => {
          let docs = [];
          result.data.data.map(doctor => {
            docs.push({
              title: doctor.profile.title,
              first_name: doctor.profile.first_name,
              last_name: doctor.profile.last_name,
              image: doctor.profile.image_url,
              specialty: doctor.specialties,
              bd_uid: doctor.uid,
              practice_city: doctor.practices[0].visit_address.city ? doctor.practices[0].visit_address.city : null,
              practice_state: doctor.practices[0].visit_address.state ? doctor.practices[0].visit_address.state : null
            });
          })
          that.setState({docs: docs});
        })
        .catch(err => { console.log("ERROR FETCHING DOCTOR INFO", err) })

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      doc_query: nextProps.searchVals.docQuery ? nextProps.searchVals.docQuery.toLowerCase() : null,
      doc_name: nextProps.searchVals.docName ? nextProps.searchVals.docName.toLowerCase() : null,
      doc_specialty: nextProps.searchVals.docSpecialty ? nextProps.searchVals.docSpecialty.toLowerCase() : null,
      doc_gender: nextProps.searchVals.docGender ? nextProps.searchVals.docGender.toLowerCase() : null,
      doc_sort: nextProps.searchVals.docSort,
      doc_state: nextProps.searchVals.docState ? nextProps.searchVals.docState.toLowerCase() : null,
      doc_city: nextProps.searchVals.docCity ? nextProps.searchVals.docCity.toLowerCase() : null
    })
    
    this.setState({
      currentDocs: this.props.myPhysicians.contacts.data
    })
  }




  render() {
    const { handleSubmit} = this.props;

      return (

          <div>
          <div className="allPhysicians">
            <ul className="myPhysicianList">
            <h2> My Physicians </h2>
            {this.state.currentDocs.length ===0 ? 'Please find physicians to select below' : ''}
            {this.state.currentDocs.map((doc,index) => {
              return (
                <li key={index}><Link to={"/patient/physicians/"+doc.betterDoctorUID+"/individual"}>
                <img className="physicianImage" src={doc.photo_path} />
                <p className="physicianInfo">{doc.first} {doc.last}</p>
                <br/>
                <p className="physicianSpecialty">{doc.specialty}</p>
                </Link></li>
              )
            })}
            </ul>

            <form className="searchForm" onSubmit={handleSubmit(props => this.searchSubmit(props))} >
              <div>
                <h2> <i className="fa fa-search fa-2x" aria-hidden="true"></i> Find A Physician</h2>
                <label htmlFor="docQuery" className="formLabel">Search </label>
                <Field placeholder="Search by name, location, practice, specialty" name="docQuery" type="text" component={renderInput} />
              </div>

              <h3> OR </h3>
              <p className="helpfulInfo">City/State or Provider Name must be provided</p>
              <br/>
              <span>
                <label htmlFor="docName" className="formLabel">Name</label>
                <Field name="docName" type="text" component={renderInput} placeholder="Provider Name" />
              </span>
              <span>
                <label htmlFor="docSpecialty" className="formLabel">Specialty</label>
                  <Field name="docSpecialty" component="select">
                    <option value="" disabled>Select Specialty</option>
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
              </span>
              <span>
                <label htmlFor="docGender" className="formLabel">Gender</label>
                <Field name="docGender" component="select" className="smallForm">
                    <option value="" disabled >Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </Field>
              </span>
              <br />
              <span>
                <label htmlFor="docState" className="formLabel">State</label>
                <Field name="docState" component="select">
                  <option value="" disabled>State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
							  </Field>
              </span>
              <span>
                <label htmlFor="docCity" className="formLabel">City</label>
                <Field name="docCity" component={renderInput} placeholder="City" type="text"/>
              </span>
              <span>
                <label htmlFor="docSort" className="formLabel">Sort By</label>
                  <Field name="docSort" component="select" className="smallForm">
                    <option value ="" disabled>Sort</option>
                    <option value="full-name-asc">Name</option>
                    <option value="best-match-asc">Best Match Ascending</option>
                    <option value="best-match-desc">Best Match Descending</option>
                    <option value="distance-asc">Distance Ascending</option>
                    <option value="distance-desc">Distance Descending</option>
                    <option value="first-name-asc">First Name Ascending</option>
                    <option value="first-name-desc">First Name Descending</option>
                    <option value="full-name-asc">Full Name Ascending</option>
                    <option value="full-name-desc">Full Name Descending</option>
                    <option value="last-name-asc">Last Name Ascending</option>
                    <option value="last-name-desc">Last Name Descending</option>
                    <option value="rating-asc">Rating Ascending</option>
                    <option value="rating-desc">Rating Descending</option>
                  </Field>
              </span>
              <br />
                <button type="submit" className="submitButton">Submit</button>
            </form>



          <ul className="allPhysicianList">
          {this.state.docs.map((doc,index) => {
            return (
              <li key={index}><Link to={"/patient/physicians/"+doc.bd_uid+"/individual"}>
              <div className="physicianImageWrap"><img className="physicianImage" src={doc.image} /></div>
               <p className="physicianInfo">{doc.title} {doc.first_name} {doc.last_name}</p>
              <br/>
              <p className="physicianSpecialty">{doc.specialty[0].actor}</p>
              <br/>
              <p className="physicianSpecialty">{doc.practice_city}, {doc.practice_state}</p>
              </Link></li>
            )
          })}
          </ul>
        
        </div>
        </div>
      );
    }
};

AllUsers = reduxForm({
  form: 'getAllUsers' // a unique name for this form
})(AllUsers);

const selector = formValueSelector('getAllUsers');

const mapStateToProps = (state) => {
  return {
    userType: state.authentication.userType,
    searchVals: selector(state, 'docQuery', 'docName', 'docSpecialty', 'docGender', 'docSort', 'docState','docCity'),
    myPhysicians: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPhysicians: (patient) => dispatch(fetchMyPhysicians(patient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
