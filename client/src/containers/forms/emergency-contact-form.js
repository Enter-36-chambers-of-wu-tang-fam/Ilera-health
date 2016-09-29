import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  Slider,
  TextField,
  Toggle,
  MenuItem
} from 'redux-form-material-ui';


const validate = values => {
  const errors = {}
  if (!values.first) {
    errors.first = 'Please enter a first name'
  }
  if (!values.last) {
    errors.last = 'Please enter a last name'
  }
  if (!values.phone) {
    errors.phone = 'Please enter a phone number'
  }
  if (!values.email) {
    errors.email = 'Please enter an email'
  }
  if (!values.relationship) {
    errors.relationship = 'Please enter a value'
  }
  return errors
}

class EmergencyContactForm extends Component {

  constructor(props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  submitMe(prop) {
    this.props.handleNext();
    //get encoded id from local storage
		let id = localStorage.getItem('uid');
		//code to decode user id stored in local storage
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

    axios.post('/api/patient/emergency_contacts', prop)
      .then( found => {
        // this.context.router.push('/patient/form/insurance/');
      })
      .catch( err => {
          console.log("ERROR ENTERING INFORMATION");
      })      
  }

  getStepContent(){
    let steps=this.props.stepIndex;
    this.props.getStepContent(steps);
	}

	handlePrev(){
    this.props.handlePrev();
	}

	handleNext(){
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

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div>
        <h2>Emergency Contact Info</h2>
        <form onSubmit={handleSubmit(props => this.submitMe(props))}>
          <Field name="first" type="text" component={this.renderTextField} label="First Name"/>
          <Field name="last" type="text" component={this.renderTextField} label="Last Name"/>
          <Field name="phone" type="text" component={this.renderTextField} label="Phone Number"/>
          <Field name="email" type="email" component={this.renderTextField} label="Email"/>
          <Field name="relationship" type="text" component={this.renderTextField} label="Relationship"/>
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
                label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
                primary={true}
                type='submit'
                className='btn btn-back'
              />
            </div>
          </div>   
        </form>
      </div>
    );
  }   
};

// user types...recorded on application state
export default reduxForm({
  form: 'EmergencyContactForm',
  destroyOnUnmount: false,
  validate
})(EmergencyContactForm);