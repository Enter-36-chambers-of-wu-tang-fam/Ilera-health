// Axios
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
import { TextField } from 'redux-form-material-ui';

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

class ContactInfoForm extends Component {

  constructor(props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  // update stepper and store info in db
  submitMe(prop) {
    this.props.handleNext();
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);
    // store form data
    if ( (localStorage.getItem('contactSubmitted')) === "true" ){
      axios.put('/api/patient/contacts/update', prop)
        .then( found => {
          console.log("CONTACT INFO SUCCESSFULLY ENTERED")
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION");
        }) 
    } else {
      axios.post('/api/patient/contact', prop)
        .then( found => {
          localStorage.setItem('contactSubmitted', true)
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION");
        })    
    }  
  }

  getStepContent(){
    let steps=this.props.stepIndex;
    // see patient-signup-forms.jsx
    this.props.getStepContent(steps);
	}

	handlePrev(){
    // see patient-signup-forms.jsx
    this.props.handlePrev();
	}

	handleNext(){
    // see patient-signup-forms.jsx
    this.props.handleNext();
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

  renderSelectField ({ input, label, meta: { touched, error }, children }) {
		return (
			<SelectField
				floatingLabelText={label}
				errorText={touched && error}
				fullWidth={true}
				{...input}
				onChange={(event, index, value) => input.onChange(value)}
				children={children}/>
		)
	}

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div>
        <h2>Contact Info</h2>
        <form onSubmit={handleSubmit(props => this.submitMe(props))}>
          <h4>EMERCENGY CONTACT (1)</h4>
          <Field name="e_1_contact_first" type="text" component={this.renderTextField} label="First Name"/>
          <Field name="e_1_contact_last" type="text" component={this.renderTextField} label="Last Name"/>
          <Field name="e_1_contact_phone" type="text" component={this.renderTextField} label="Phone Number"/>
          <Field name="e_1_contact_email" type="email" component={this.renderTextField} label="Email"/>
          <div>
            <Field name="e_1_contact_relationship" component={this.renderSelectField} label="Relationship">
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
          <Field name="e_2_contact_first" type="text" component={this.renderTextField} label="First Name"/>
          <Field name="e_2_contact_last" type="text" component={this.renderTextField} label="Last Name"/>
          <Field name="e_2_contact_phone" type="text" component={this.renderTextField} label="Phone Number"/>
          <Field name="e_2_contact_email" type="email" component={this.renderTextField} label="Email"/>
          <div>
            <Field name="e_2_contact_relationship" component={this.renderSelectField} label="Relationship">
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
          <div className="formBtns clearfix">
            <div>{this.getStepContent()}</div>
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Back"
                disabled={this.props.stepIndex === 0}
                onTouchTap={this.handlePrev.bind(this)}
                style={{marginRight: 12}}
                className='btn btn-back'
              />
              <RaisedButton
                label={this.props.stepIndex === 3 ? 'Finish' : 'Next'}
                primary={true}
                type='submit'
                className='btn btn-back'
                style={{
										float: 'right'
									}}
              />
            </div>
          </div>   
        </form>
      </div>
    );
  }   
};

export default reduxForm({
  form: 'ContactInfoForm',
  destroyOnUnmount: false,
  validate
})(ContactInfoForm);