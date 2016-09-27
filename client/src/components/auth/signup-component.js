import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
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
} from 'redux-form-material-ui'

const validate = values => {
  const errors = {}
	 if (!values.first) {
    errors.first = 'Please enter your first name'
  }
	 if (!values.last) {
    errors.last = 'Please enter your last name'
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Password required'
  }
  if (!values.phone) {
    errors.phone = 'Please re-type your password'
  }
  return errors
}

class SignupForm extends Component {

  constructor(props){
    super(props);
		this.state = {
			userType: ''
		}
  }

  static contextTypes = {
      router: React.PropTypes.object
  }

	onSubmit (props) {
    console.log("TYPE", this.state.userType)
    if(this.state.userType === 'Patient') {
      axios.post('/api/patient/signup', props)
      .then( found => {
        //CryptoJS Encoding for user id --> May need to store key in database
        //We can create a random key and add it to props to store in the database above
        //Maybe defeats the purpose though as the key will be stored on the front end here...

        let encodedId = CryptoJS.AES.encrypt(String(found.data), 'key');  //need to change key to actual key
        localStorage.setItem('uid',encodedId);
        this.context.router.push('/patient/form/background');
      })
      .catch( err => {
          console.log("LOGIN ERROR", err);
      })
    }else if(this.state.userType === 'Provider'){

      axios.post('/api/physician/signup/', props)
      .then( found => {
        let encodedId = CryptoJS.AES.encrypt(String(found.data), 'key');  //need to change key to actual key
        localStorage.setItem('uid',encodedId);
        this.context.router.push('provider/');
      })
      .catch( err => {
          console.log("LOGIN ERROR", err);
      })
    }
	}

	handleChange(event) {
    console.log("CHANGE", event.target.value)
		this.setState({ userType: event.target.value })
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
					<h2>Sign Up</h2>					
					<form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
							<Field name="userType" component={RadioButtonGroup} onChange={this.handleChange.bind(this)} defaultSelected="Patient">
                <RadioButton value="Provider" label="Provider" />
                <RadioButton value="Patient" label="Patient"/>
              </Field>
              <div>
                <Field name="first" type="text" component={this.renderTextField} label="First"/>
              </div>
              <div>  
                <Field name="last" type="text" component={this.renderTextField} label="Last"/>
              </div>
              <div>
                <Field name="email" type="text" component={this.renderTextField} label="Email"/>
              </div>
              <div>
                <Field name="password" type="password" component={this.renderTextField} label="Password"/>
              </div>
              <div>
                <Field name="reTypePassword" type="password" component={this.renderTextField} label="Re-Type Password"/>
              </div>
              {error && <strong>{error}</strong>}
						  <button type='submit' className='btn'>Sign Up</button>
						</form>
				</div>
			)
		}

};
		

// user types...recorded on application state
export default reduxForm({
	form: 'SignupForm',
	validate
}, null, {  })(SignupForm);
