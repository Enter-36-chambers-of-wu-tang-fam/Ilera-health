import _ from 'lodash';
import axios from 'axios';
// React, Redux, Redux-Form
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// CryptoJS
import CryptoJS from 'crypto-js';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import { DatePicker, TextField } from 'redux-form-material-ui'
// Actions
import { getDocInfo } from '../../actions/better-doc.js';

const validate = values => {
  const errors = {}
  // if (!values.first || /\d/.test(values.first)) {
  //   errors.first = 'Please enter a valid first name'
  // }
	if (values.middle && /\d/.test(values.middle)) {
    errors.middle = 'Please enter a valid middle name'
  }
  // if (!values.last || /\d/.test(values.last)) {
  //   errors.last = 'Please enter a valid last name'
  // }
	if (values.maiden && /\d/.test(values.maiden)) {
    errors.maiden = 'Please enter a valid maiden name'
  }
	if (values.birth_city && /\d/.test(values.birth_city)) {
    errors.birth_city = 'Please enter a valid city of birth'
  }
	if (values.primary_language && /\d/.test(values.primary_language)) {
    errors.primary_language = 'Please enter a valid primary language'
  }
	if (values.secondary_language && /\d/.test(values.secondary_language)) {
    errors.secondary_language = 'Please enter a valid secondary language'
  }

  return errors
}

class BackgroundInfoForm extends Component {

  constructor(props){
    super(props);
    this.state = {
        betterUID: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
      const { getDocInfo } = this.props;
      var uid = localStorage.getItem('betterUID');
      getDocInfo(uid);
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

	renderTextFieldFirst (props) {
		return(
			<TextField
				hintText={props.label}
				floatingLabelText={props.label}
				fullWidth={true}
				value={localStorage.getItem('first')}
				errorText={props.touched && props.error}
				{...props}
			/>
		)
	}

	renderTextFieldLast (props) {
		return(
			<TextField
				hintText={props.label}
				floatingLabelText={props.label}
				fullWidth={true}
				value={localStorage.getItem('last')}
				defaultValue={localStorage.getItem('last')}
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
        const { betterUID } = this.state;
        if(betterUID){
            return (
                <div>
                    <h2> Better Doctor Info </h2>
                    <img src="" alt=""/>
                    <h6>Name</h6>
                    <h5></h5>
                    <h6>Email</h6>
                    <h5></h5>
                    <h6>State</h6>
                    <h5></h5>
                    <h6>Bio</h6>
                    <h5></h5>
                </div>
            )
        } else {
            return (
			<div  className="forms">
				<h2>Basic User Info</h2>
				<h6>* Required field</h6>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<Field name="betterDoctorUID" type="text" component={this.renderTextFieldFirst} label="Better Doctor UID"/>
						<Field name="first" type="text" component={this.renderTextField} label="First Name*"/>
						<Field name="last" type="text" component={this.renderTextFieldLast} label="Last Name*"/>
						<Field name="phone_number" type="text" component={this.renderTextField} label="Phone Number"/>
						<Field name="specialty" type="text" component={this.renderTextField} label="Specialty"/>

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
								label='Finish'
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
		
	}
};

BackgroundInfoForm = reduxForm({
	form: 'BackgroundInfoForm',
	destroyOnUnmount: false,
	validate
})(BackgroundInfoForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDocInfo }, dispatch);
}

export default connect(null, mapDispatchToProps)(BackgroundInfoForm);