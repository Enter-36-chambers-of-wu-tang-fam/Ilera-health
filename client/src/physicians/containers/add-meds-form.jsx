import axios from 'axios';
// React, Redux-Form, React-Router
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
// CryptoJS
import CryptoJS from 'crypto-js';
// Material-UI, Redux-Form-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import normalizeDate from '../../patients/components/medical-history-dash/normalizeDate.js'
import {
  TextField
} from 'redux-form-material-ui';

// FORM VALIDATION
const validate = values => {
  const errors = {}
  // First names
//   if ( values.first && /\d/.test(values.first)) {
//     errors.first = 'Please enter a valid first name'
//   }
//   if ( values.e_1_contact_first && /\d/.test(values.e_1_contact_first)) {
//     errors.e_1_contact_first = 'Please enter a valid first name'
//   }
//   if ( values.e_2_contact_first && /\d/.test(values.e_2_contact_first)) {
//     errors.e_2_contact_first = 'Please enter a valid first name'
//   }
//   // Last Names
//   if (values.last && /\d/.test(values.last)) {
//     errors.last = 'Please enter a valid last name'
//   }
//   if (values.e_1_contact_last && /\d/.test(values.e_1_contact_last)) {
//     errors.e_1_contact_last = 'Please enter a valid last name'
//   }
//   if (values.e_2_contact_last && /\d/.test(values.e_2_contact_last)) {
//     errors.e_2_contact_last = 'Please enter a valid last name'
//   }
//   // City
//   if (values.city && /\d/.test(values.city)) {
//     errors.city = 'Please enter a valid city'
//   }
//   // Zip
//   if (values.zip && !/^[0-9]+$/.test(values.zip)) {
//     errors.zip = 'Please enter a valid zip code'
//   }
//   // Phone #s
//   if (values.primary_phone_number && !/^[0-9]+$/.test(values.primary_phone_number)) {
//     errors.primary_phone_number = 'Invalid phone number - no special charachters'
//   }
//   if (values.secondary_phone_number && !/^[0-9]+$/.test(values.secondary_phone_number)) {
//     errors.secondary_phone_number = 'Invalid phone number - no special charachters'
//   }
//   if (values.e_1_contact_phone && !/^[0-9]+$/.test(values.e_1_contact_phone)) {
//     errors.e_1_contact_phone = 'Invalid phone number - no special charachters'
//   }
//   if (values.e_2_contact_phone && !/^[0-9]+$/.test(values.e_2_contact_phone)) {
//     errors.e_2_contact_phone = 'Invalid phone number - no special charachters'
//   }
//   // Emails
//   if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//   if (values.e_1_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.e_1_contact_email)) {
//     errors.e_1_contact_email = 'Invalid email address'
//   }
//   if (values.e_2_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.e_2_contact_email)) {
//     errors.e_2_contact_email = 'Invalid email address'
//   }

  return errors
}

class AddMedForm extends Component {

  constructor(props){
    super(props);
  }

  submitMe(prop) {
    // decrypt user id
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    prop.id_physician = code.toString(CryptoJS.enc.Utf8);
    prop.id_patient = this.props.patId; // will need to change
    // store form data
      axios.post('/api/patient/medications', prop)
        .then( found => {
          console.log("I'm WORKING!!!!")
          // this.context.router.push('/patient/form/insurance/');
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION");
        })
  }

  renderTextField (props) {
    return(
      <TextField
        hintText={props.label}
        floatingLabelText={props.label}
        fullWidth={true}
        errorText={props.touched && props.error}
        {...props}
      />
    )
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div>
        <h2>Add Med</h2>
        <form
          onSubmit={handleSubmit(props => this.submitMe(props))}
          >
          <Field
            name="drug_name"
            type="text"
            component={this.renderTextField}
            label="Medication*"
          />
          <Field
            name="dosage"
            type="text"
            component={this.renderTextField}
            label="Dosage*"
          />
          <Field
            name="start_date (YYYY-MM-DD)"
            type="text"
            component={this.renderTextField}
            label="Start Date*"
            normalize={normalizeDate}
          />
          <Field
            name="end_date (YYYY-MM-DD)"
            type="text"
            component={this.renderTextField}
            label="End Date"
            normalize={normalizeDate}
          />

          <RaisedButton
            label="Save"
            type='submit'
            className='btn'
            style={{
              width: '100%',
              margin: '20px 0 0 0'
          }}/>
        </form>
      </div>
    );
  }
};

export default reduxForm({
  form: 'AddMedForm',
  destroyOnUnmount: false,
  validate
})(AddMedForm);
