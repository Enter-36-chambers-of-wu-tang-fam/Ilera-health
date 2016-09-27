import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser } from '../../actions/actions.js';
import CryptoJS from 'crypto-js';
import {
  AutoComplete,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  TextField
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
			userType: 'patient'
		}
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

	onSubmit(props) {    
    axios.post(`/api/${this.state.userType}/signup`, props)
    .then( registered => {
      let encodedId = CryptoJS.AES.encrypt(String(registered.data), 'key');  //need to change key to actual key 

      localStorage.setItem('uid',encodedId);
      localStorage.setItem('userType',this.state.userType);
      this.props.authenticateUser();
      if(this.state.userType === 'patient') this.context.router.push('/patient/form/background');
      else this.context.router.push('provider/');

    })
    .catch( err => {
        console.log("LOGIN ERROR", err);
    })
  }

	handleChange(event) {
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
							<Field name="userType" component={RadioButtonGroup} onChange={this.handleChange.bind(this)} defaultSelected="patient">
                <RadioButton value="patient" label="Patient"/>
                <RadioButton value="physician" label="Provider" />
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

SignupForm = reduxForm({
	form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => {
    dispatch(authenticateUser());
  },
	validate
}, null, {  })(SignupForm);


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticateUser }, dispatch);
}


export default connect(null, mapDispatchToProps)(SignupForm)
