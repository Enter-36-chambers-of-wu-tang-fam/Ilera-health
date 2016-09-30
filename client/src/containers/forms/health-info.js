import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import CryptoJS from 'crypto-js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import {
	DatePicker,
  TextField
} from 'redux-form-material-ui'

// Actions
import { emergencyContact } from '../../actions/actions.js';

const validate = values => {
  const errors = {}
  if (!values.first || /\d/.test(values.first)) {
    errors.first = 'Please enter a first name'
  }
  if (!values.last || /\d/.test(values.last)) {
    errors.last = 'Please enter a last name'
  }
  if (/\d/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number - only numbers'
  }
  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  
	if (values.weight && /^[1-9][\.\d]*(,\d+)?$/.test(values.weight)) {
    errors.weight = 'Please enter a valid weight'
  }

	if (values.height && /^[1-9][\.\d]*(,\d+)?$/.test(values.height)) {
    errors.height = 'Please enter a valid height'
  }

  return errors
}

class HealthInfo extends Component {
  
  constructor(props){
    super(props);
		let maxDate = new Date();
		
		let minDate = new Date(1900, 1, 1);
		console.log(maxDate, minDate);
		this.state = {
			maxDate: maxDate,
			minDate: minDate
		}
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
			<div  className="forms">
				<h2>Basic User Info</h2>
				<h6>* Required field</h6>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<div>
							<Field name="sex" component={this.renderSelectField} label="Sex">
									<MenuItem value={'Man'} primaryText="Man"/>
									<MenuItem value={'Woman'} primaryText="Woman"/>
									<MenuItem value={'Transgender'} primaryText="Transgender"/>
									<MenuItem value={'Transsexual'} primaryText="Transsexual"/>
									<MenuItem value={'Trans Woman'} primaryText="Trans Woman"/>
									<MenuItem value={'Trans Man'} primaryText="Trans Man"/>
									<MenuItem value={'Genderfluid'} primaryText="Genderfluid"/>
									<MenuItem value={'Agender'} primaryText="Agender"/>
							</Field>
						</div>
						<Field name="weight" type="text" component={this.renderTextField} label="Weight (lbs)"/>
						<Field name="height" type="text" component={this.renderTextField} label="Height (0.0)"/>   
						<div>
							<Field name="blood_type" component={this.renderSelectField} label="Blood Type">
								<MenuItem value={'A+'} primaryText="A+"/>
								<MenuItem value={'A-'} primaryText="A-"/>
								<MenuItem value={'B+'} primaryText="B+"/>
								<MenuItem value={'B-'} primaryText="B-"/>
								<MenuItem value={'AB+'} primaryText="AB+"/>
								<MenuItem value={'AB-'} primaryText="AB-"/>
								<MenuItem value={'O+'} primaryText="O+"/>
								<MenuItem value={'O-'} primaryText="O-"/>
							</Field>
						</div>
						{error && <strong>{error}</strong>}
						<div className="formBtns clearfix">
							<div>{this.getStepContent()}</div>
							<div style={{margin: '20px 0'}}>
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
										'float': 'right',
										'backgroundColor': '#fff'
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
	form: 'HealthInfo',
	destroyOnUnmount: false,
	validate
})(HealthInfo);