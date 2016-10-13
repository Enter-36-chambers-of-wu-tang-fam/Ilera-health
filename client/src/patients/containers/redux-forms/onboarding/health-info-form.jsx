// Axios
import axios from 'axios';
// React / Redux
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// Actions
import { emergencyContact } from '../../../../auth-shared/actions/actions.js';
// Crypto
import CryptoJS from 'crypto-js';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { TextField } from 'redux-form-material-ui'


const validate = values => {
  const errors = {}

	if (values.weight && !/^[1-9][\.\d]*(,\d+)?$/.test(values.weight)) {
    errors.weight = 'Please enter a valid weight'
  }

	if (values.height && !/^[1-9][\.\d]*(,\d+)?$/.test(values.height)) {
    errors.height = 'Please enter a valid height'
  }

  return errors
}

class HealthInfo extends Component {

  constructor(props){
    super(props);
		let maxDate = new Date();
		let minDate = new Date(1900, 1, 1);
		this.state = {
			fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckboxes: true,
      height: '300px'
		};
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

	// update stepper and save form info in db
	submitMe(prop){
		this.props.handleNext();
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

		axios.put('/api/patient/health', prop)
			.then( found => {
				console.log("HEALTH INFO SUBMITTED SUCCESSFULLY");
			})
			.catch( err => {
					console.log("ERROR ENTERING INFORMATION", err);
			})
	}

	// update stepper
	// see patient-signup-forms.jsx
	getStepContent(){
		let steps=this.props.stepIndex;
		this.props.getStepContent(steps);
	}

	// update stepper
	// see patient-signup-forms.jsx
	handlePrev(){
		this.props.handlePrev();
	}

	// update stepper
	// see patient-signup-forms.jsx
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

	renderMultiLineTextField (props) {
		return(
			<TextField
				hintText={props.label}
				floatingLabelText={props.label}
				fullWidth={true}
				multiLine={true}
				rowsMax={4}
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
				<h2>Health Info</h2>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<div>
							<Field name="gender" component={this.renderSelectField} label="Gender">
								<MenuItem value={'Male'} primaryText="Man"/>
								<MenuItem value={'Female'} primaryText="Woman"/>
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
						<Field name="procedures" type="text" component={this.renderMultiLineTextField} label="Past Procedures (include dates)"/>
						<Field name="conditions" type="text" component={this.renderMultiLineTextField} label="Conditions"/>
						<Field name="medications" type="text" component={this.renderMultiLineTextField} label="Medications (include dosage/frequency)"/>
						<Field name="allergies" type="text" component={this.renderMultiLineTextField} label="Allergies (Ex: allergy-reaction;)"/>

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
									label={this.props.stepIndex === 4 ? 'Finish' : 'Next'}
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