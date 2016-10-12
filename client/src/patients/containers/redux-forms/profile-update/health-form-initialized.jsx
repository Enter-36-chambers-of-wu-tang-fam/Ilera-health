// Health form initialized and used for patient to update their info
// Axios
import axios from 'axios';
// React / Redux
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// Crypto
import CryptoJS from 'crypto-js';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { TextField } from 'redux-form-material-ui'
// Actions
import { getUserInfo, didInit } from '../../../actions/user.js';
import { emergencyContact } from '../../../../auth-shared/actions/actions.js';

const patientStyle = {
	display: {display: 'block'}
}

const providerStyle = {
	display: {display: 'none'}
}

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

class HealthInfoFormInitialized extends Component {

  constructor(props){
    super(props);
		const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
		this.state = {
			allergies: [],
			patient: status
		};
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleInitialize(nextProps){
    const data = {
      "gender": nextProps.health.gender,
      "weight": nextProps.health.weight,
      "height": nextProps.health.height,
      "blood_type": nextProps.health.blood_type,
      "procedures": nextProps.health.procedures,
      "conditions": nextProps.health.conditions,
      "medications": nextProps.health.medications,
      "allergies": nextProps.health.allergies
    }
    this.props.initialize(data);
    nextProps.didInit();
  }

  componentWillReceiveProps(nextProps){
		if(!nextProps.init){
		  this.handleInitialize(nextProps);
	  }
  }

	submitMe(prop){
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

		axios.put('/api/patient/health', prop)
		.then( found => {
			console.log("DATA UPDATED SUCCESSFULLY");
		})
		.catch( err => {
			console.log("ERROR ENTERING INFORMATION", err);
		})
	}


	renderTextField ({ input, label, disabled, meta: { touched, error } } ) {
		return(
			<TextField
				hintText={label}
				floatingLabelText={label}
				fullWidth={true}
				onChange={(event, index, value) => input.onChange(value)}
				disabled={disabled}
				errorText={touched && error}
				{...input}
			/>
		)
	}

	renderMultiLineTextField ({ input, label, disabled, meta: { touched, error } } ) {
		return(
			<TextField
				hintText={label}
				floatingLabelText={label}
				fullWidth={true}
				multiLine={true}
				onChange={(event, index, value) => input.onChange(value)}
				disabled={disabled}
				errorText={touched && error}
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
			<div  className="forms">
				<h2>Health Info</h2>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<div>
							<Field name="gender" component={this.renderSelectField} label="Gender" disabled={patient}>
								<MenuItem value={'Male'} primaryText="Male"/>
								<MenuItem value={'Female'} primaryText="Female"/>
								<MenuItem value={'Transgender'} primaryText="Transgender"/>
								<MenuItem value={'Transsexual'} primaryText="Transsexual"/>
								<MenuItem value={'Trans Woman'} primaryText="Trans Female"/>
								<MenuItem value={'Trans Man'} primaryText="Trans Male"/>
								<MenuItem value={'Genderfluid'} primaryText="Genderfluid"/>
								<MenuItem value={'Agender'} primaryText="Agender"/>
							</Field>
						</div>
						<Field name="weight" type="text" component={this.renderTextField} label="Weight (lbs)" disabled={patient}/>
						<Field name="height" type="text" component={this.renderTextField} label="Height (0.0)" disabled={patient}/>
						<div>
							<Field name="blood_type" component={this.renderSelectField} label="Blood Type" disabled={patient}>
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
						<Field name="procedures" type="text" component={this.renderMultiLineTextField} label="Past Procedures (include dates)" disabled={patient}/>
						<Field name="conditions" type="text" component={this.renderMultiLineTextField} label="Conditions" disabled={patient}/>
						<Field name="medications" type="text" component={this.renderMultiLineTextField} label="Medications (include dosage/frequency)" disabled={patient}/>
						<Field name="allergies" type="text" component={this.renderMultiLineTextField} label="Allergies (Ex: allergy-reaction;)" disabled={patient}/>

						{error && <strong>{error}</strong>}
						<RaisedButton
							label='Save'
							primary={true}
							type='submit'
							style={patient ? providerStyle.display : patientStyle.display }
						/>
					</form>
			</div>
		);
	}
};

HealthInfoFormInitialized = reduxForm({
  form: 'HealthInfoFormInitialized',
  destroyOnUnmount: false,
  validate
})(HealthInfoFormInitialized);

export default HealthInfoFormInitialized;