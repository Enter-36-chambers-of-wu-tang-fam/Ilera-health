// Form shown after welcome view upon successful provider sign up
// Axios
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
	if (values.middle && /\d/.test(values.middle)) {
    errors.middle = 'Please enter a valid middle name'
  }
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
		console.log("WTF", props)
    this.state = {
        betterUID: localStorage.getItem('betterUID')
    }
  }

	static contextTypes = {
		router: React.PropTypes.object
	}

	componentWillMount(){
		const { initialize } = this.props;
		initialize({first: `${localStorage.getItem('first')}`, last: `${localStorage.getItem('last')}` });
	}

	submitMe(prop){
		const { betterUID } = this.state;
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

		axios.put('/api/physician/background', prop)
			.then( found => {
				this.context.router.push('/provider/dashboard');
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

	handleFinal(){
		this.context.router.push('/provider/dashboard');
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
		const { error, handleSubmit, pristine, reset, submitting, doc } = this.props;
		const { betterUID } = this.state;
		if( doc.data && betterUID !== undefined ){
			return (
				<div className="providerDB">
					<h2> Better Doctor Info </h2>
					<img src={doc.data.data.profile.image_url} alt=""/>
					<h6>Name</h6>
					<p>
            {doc.data.data.profile.first_name}
            {doc.data.data.profile.last_name},
            {doc.data.data.profile.title}
          </p>
					<h6>Email</h6>
					<p>
            {doc.data.data.profile.email ?
              doc.data.data.profile.email : 'No data'}
            </p>
					<h6>State</h6>
					<p>
            {doc.data.data.practices[0].visit_address_state ?
              doc.data.data.practices[0].visit_address_state : 'No data'}
          </p>
					<h6>Bio</h6>
					<p>
            {doc.data.data.profile.bio ?
              doc.data.data.profile.bio : 'No data'}
          </p>

					<p>
            **If any of the information is innacurate or out of date, please
            <a href='http://betterdoctor.com/doctors'>update your information</a>
            .
          </p>

					<div className="formBtns clearfix">
						<div>{this.getStepContent()}</div>
						<div style={{margin: '20px 0'}}>
							<FlatButton
								label="Back"
								disabled={this.props.stepIndex === 0}
								onTouchTap={this.handlePrev.bind(this)}
								style={{marginRight: 12}}
								className='btn btn-back' />
							<RaisedButton
								label='Finish'
								primary={true}
								type='submit'
								className='btn btn-back'
								onTouchTap={this.handleFinal.bind(this)}
								style={{
									'float': 'right',
									'backgroundColor': '#fff'
								}}/>
						</div>
					</div>
				</div>
				)
			} else {
				return (
					<div  className="forms">
						<h2>Basic User Info</h2>
						<h6>* Required field</h6>
						<form
              onSubmit={handleSubmit(props => this.submitMe(props))}
            >
							<Field
                name="betterDoctorUID"
                type="text"
                component={this.renderTextField}
                label="Better Doctor UID"
              />
							<Field
                name="first"
                type="text"
                component={this.renderTextField}
                label="First Name*"
              />
							<Field
                name="last"
                type="text"
                component={this.renderTextField}
                label="Last Name*"
              />
							<Field
                name="phone_number"
                type="text"
                component={this.renderTextField}
                label="Phone Number"
              />
							<Field
                name="specialty"
                type="text"
                component={this.renderTextField}
                label="Specialty"
              />

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
	validate,
	initialValues: {
    first: `${localStorage.getItem('first')}`,
    last: `${localStorage.getItem('last')}`
  }
})(BackgroundInfoForm);

export default BackgroundInfoForm;
