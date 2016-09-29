import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import CryptoJS from 'crypto-js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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

// Actions
import { emergencyContact } from '../../actions/actions.js';

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
  if (!values.city) {
    errors.city = 'Please enter a city'
  }
  return errors
}

class DemographicForm extends Component {
  
  constructor(props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

	submitMe(prop){
			this.props.handleNext();
			//get encoded id from local storage
			let id = localStorage.getItem('uid');
			//code to decode user id stored in local storage
			let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
			prop.uid = code.toString(CryptoJS.enc.Utf8);

			axios.put('/api/patient/background', prop)
				.then( found => {
						// this.context.router.push('/patient/form/emergencyContact/');
				})
				.catch( err => {
						console.log("ERROR ENTERING INFORMATION", err);
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

	renderDatePicker (props) {
			return(
			<DatePicker 
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
				<h2>Basic User Info</h2>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<Field name="first" type="text" component={this.renderTextField} label="First Name"/>
						<Field name="last" type="text" component={this.renderTextField} label="Last Name"/>
						<Field name="date_of_birth" type="date" component={this.renderTextField} label="Date of Birth"/>
						<Field name="address" type="text" component={this.renderTextField} label="Street Address"/>
						<Field name="city" type="text" component={this.renderTextField} label="City"/>
						<Field name="state" component="select">
							<option value="">Select A State</option>
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
						<Field name="zip" type="text" component={this.renderTextField} label="Zip Code"/>
						<Field name="email" type="text" component={this.renderTextField} label="Email"/> 
						<Field name="phone_number" type="text" component={this.renderTextField} label="Phone Number"/>
						<Field name="weight" type="text" component={this.renderTextField} label="Weight"/>
						<Field name="height" type="text" component={this.renderTextField} label="Height"/>   
						<Field name="blood_type" component="select">
							<option value="">Blood Type</option>
							<option value="A+">A+</option>
							<option value="A-">A-</option>
							<option value="B+">B+</option>
							<option value="B-">B-</option>
							<option value="AB+">AB+</option>
							<option value="AB-">AB-</option>
							<option value="O+">O+</option>
							<option value="O-">O-</option>
						</Field>
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
    form: 'DemographicForm',
    destroyOnUnmount: false,
    validate
})(DemographicForm);