// Contact form initialized and used for patient to update their info
// Axios
import axios from 'axios';
// React, Redux-Form, React-Router
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
// Actions
import { getUserContacts, didInit } from '../../../actions/user.js';
// CryptoJS
import CryptoJS from 'crypto-js';
// Material-UI, Redux-Form-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import { TextField } from 'redux-form-material-ui';


const patientStyle = {
	display: {display: 'block'}
}

const providerStyle = {
	display: {display: 'none'}
}

// FORM VALIDATION
const validate = values => {
  const errors = {}
  // First names
  if ( values.first && /\d/.test(values.first)) {
    errors.first = 'Please enter a valid first name'
  }
  if ( values.e_1_contact_first && /\d/.test(values.e_1_contact_first)) {
    errors.e_1_contact_first = 'Please enter a valid first name'
  }
  if ( values.e_2_contact_first && /\d/.test(values.e_2_contact_first)) {
    errors.e_2_contact_first = 'Please enter a valid first name'
  }
  // Last Names
  if (values.last && /\d/.test(values.last)) {
    errors.last = 'Please enter a valid last name'
  }
  if (values.e_1_contact_last && /\d/.test(values.e_1_contact_last)) {
    errors.e_1_contact_last = 'Please enter a valid last name'
  }
  if (values.e_2_contact_last && /\d/.test(values.e_2_contact_last)) {
    errors.e_2_contact_last = 'Please enter a valid last name'
  }
  // City
  if (values.city && /\d/.test(values.city)) {
    errors.city = 'Please enter a valid city'
  }
  // Zip
  if (values.zip && !/^[0-9]+$/.test(values.zip)) {
    errors.zip = 'Please enter a valid zip code'
  }
  // Phone #s
  if (values.primary_phone_number && !/^[0-9]+$/.test(values.primary_phone_number)) {
    errors.primary_phone_number = 'Invalid phone number - no special charachters'
  }
  if (values.secondary_phone_number && !/^[0-9]+$/.test(values.secondary_phone_number)) {
    errors.secondary_phone_number = 'Invalid phone number - no special charachters'
  }
  if (values.e_1_contact_phone && !/^[0-9]+$/.test(values.e_1_contact_phone)) {
    errors.e_1_contact_phone = 'Invalid phone number - no special charachters'
  }
  if (values.e_2_contact_phone && !/^[0-9]+$/.test(values.e_2_contact_phone)) {
    errors.e_2_contact_phone = 'Invalid phone number - no special charachters'
  }
  // Emails
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.e_1_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.e_1_contact_email)) {
    errors.e_1_contact_email = 'Invalid email address'
  }
  if (values.e_2_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.e_2_contact_email)) {
    errors.e_2_contact_email = 'Invalid email address'
  }

  return errors
}

class ContactInfoFormInitialized extends Component {

  constructor(props){
    super(props);
    const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
    this.state = {
      patient: status
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

	// initialize form with user info
  handleInitialize(nextProps){
    const data = {
      "e_1_contact_first": nextProps.contacts.e_1_contact_first,
      "e_1_contact_last": nextProps.contacts.e_1_contact_last,
      "e_1_contact_email": nextProps.contacts.e_1_contact_email,
      "e_1_contact_phone": nextProps.contacts.e_1_contact_phone,
      "e_1_contact_relationship": nextProps.contacts.e_1_contact_relationship,
      "e_2_contact_first": nextProps.contacts.e_2_contact_first,
      "e_2_contact_last": nextProps.contacts.e_2_contact_last,
      "e_2_contact_email": nextProps.contacts.e_2_contact_email,
      "e_2_contact_phone": nextProps.contacts.e_2_contact_phone,
      "e_2_contact_relationship": nextProps.contacts.e_2_contact_relationship
    }
    this.props.initialize(data);
    nextProps.didInit();
  }

  componentWillReceiveProps(nextProps){
	  if(!nextProps.init){
		  this.handleInitialize(nextProps);
	  }
  }

  submitMe(prop) {
    // decrypt user id
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);
    // store form data
    axios.put('/api/patient/contacts/update', prop)
      .then( found => {
        console.log("DATA UPDATED SUCCESSFULLY");
      })
      .catch( err => {
          console.log("ERROR ENTERING INFORMATION");
      })      
  }

	renderTextField ({ input, label, disabled, meta: { touched, error } } ) {
		return(
			<TextField
				hintText={label}
				floatingLabelText={label}
				fullWidth={true}
				onChange={(event, index, value) => input.onChange(value)}
				errorText={touched && error}
				disabled={disabled}
				{...input}
			/>
		)
	}

  renderSelectField ({ input, label, disabled, meta: { touched, error }, children }) {
		return (
			<SelectField
				floatingLabelText={label}
				errorText={touched && error}
				fullWidth={true}
        disabled={disabled}
				{...input}
				onChange={(event, index, value) => input.onChange(value)}
				children={children}/>
		)
	}

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    const { patient } = this.state;
    return (
      <div>
        <h2>Contact Info</h2>
        <form onSubmit={handleSubmit(props => this.submitMe(props))}>
          <h4>EMERCENGY CONTACT (1)</h4>
          <Field name="e_1_contact_first" type="text" component={this.renderTextField} label="First Name" disabled={patient}/>
          <Field name="e_1_contact_last" type="text" component={this.renderTextField} label="Last Name" disabled={patient}/>
          <Field name="e_1_contact_phone" type="text" component={this.renderTextField} label="Phone Number" disabled={patient}/>
          <Field name="e_1_contact_email" type="email" component={this.renderTextField} label="Email" disabled={patient}/>
          <div>
            <Field name="e_1_contact_relationship" component={this.renderSelectField} label="Relationship" disabled={patient}>
              <MenuItem value={'Father'} primaryText="Father"/>
              <MenuItem value={'Mother'} primaryText="Mother"/>
              <MenuItem value={'Step-Father'} primaryText="Step-Father"/>
              <MenuItem value={'Step-Mother'} primaryText="Step-Mother"/>
              <MenuItem value={'Sibling'} primaryText="Sibling"/>
              <MenuItem value={'Legal Guardian'} primaryText="Legal Guardian"/>
              <MenuItem value={'Friend'} primaryText="Friend"/>
              <MenuItem value={'Spouse'} primaryText="Spouse"/>
              <MenuItem value={'Child'} primaryText="Child"/>
              <MenuItem value={'Grandparent'} primaryText="Grandparent"/>
              <MenuItem value={'Other'} primaryText="Other"/>
            </Field>
          </div>
          <h4>EMERCENGY CONTACT (2)</h4>
          <Field name="e_2_contact_first" type="text" component={this.renderTextField} label="First Name" disabled={patient}/>
          <Field name="e_2_contact_last" type="text" component={this.renderTextField} label="Last Name" disabled={patient}/>
          <Field name="e_2_contact_phone" type="text" component={this.renderTextField} label="Phone Number" disabled={patient}/>
          <Field name="e_2_contact_email" type="email" component={this.renderTextField} label="Email" disabled={patient}/>
          <div>
            <Field name="e_2_contact_relationship" component={this.renderSelectField} label="Relationship" disabled={patient}>
              <MenuItem value={'Father'} primaryText="Father"/>
              <MenuItem value={'Mother'} primaryText="Mother"/>
              <MenuItem value={'Step-Father'} primaryText="Step-Father"/>
              <MenuItem value={'Step-Mother'} primaryText="Step-Mother"/>
              <MenuItem value={'Sibling'} primaryText="Sibling"/>
              <MenuItem value={'Legal Guardian'} primaryText="Legal Guardian"/>
              <MenuItem value={'Friend'} primaryText="Friend"/>
              <MenuItem value={'Spouse'} primaryText="Spouse"/>
              <MenuItem value={'Child'} primaryText="Child"/>
              <MenuItem value={'Grandparent'} primaryText="Grandparent"/>
              <MenuItem value={'Other'} primaryText="Other"/>
            </Field>
          </div>
          {error && <strong>{error}</strong>}
          <RaisedButton
            label='Save'
            primary={true}
            type='submit'
            style={patient ? providerStyle.display : patientStyle.display}
					/>
        </form>
      </div>
    );
  }   
};

ContactInfoFormInitialized = reduxForm({
  form: 'ContactInfoFormInitialized',
  destroyOnUnmount: false,
  validate
})(ContactInfoFormInitialized);

export default ContactInfoFormInitialized;