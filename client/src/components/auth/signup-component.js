import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser } from '../../actions/actions.js';
import CryptoJS from 'crypto-js';
import RaisedButton from 'material-ui/RaisedButton';
import {
  AutoComplete,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  TextField
} from 'redux-form-material-ui'

const validate = values => {
  const errors = {}
	 if (!values.first || /\d/.test(values.first)) {
    errors.first = 'Please enter a valid first name'
  }
	 if (!values.last || /\d/.test(values.last)) {
    errors.last = 'Please enter a valid last name'
  }
  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password || values.password.length < 8) {
    errors.password = 'Password required. Must be at least 8 charachters long'
  }

  if (values.reTypePassword && values.reTypePassword !== values.password) {
    errors.reTypePassword = 'Passwords must match'
  }

  return errors
}

class SignupForm extends Component {

  constructor(props){
    super(props);
		this.state = {
			userType: props.userType
		}
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

	onSubmit(props) {
    this.props.authenticateUser(this.state.userType, props,"signup");
    if(this.state.userType === 'physician') this.context.router.push('provider/');
    if(this.state.userType === 'patient') this.context.router.push('/patient/form');
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
					<h2>{this.props.title} Sign Up</h2>
					<form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
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
						  <RaisedButton label="Sign Up" type='submit' className='btn' style={{
                width: '100%',
                margin: '20px 0 0 0'
              }}/>
						</form>
				</div>
			)
		}

};

SignupForm = reduxForm({
	form: 'SignupForm',
  destroyOnUnmount: false,
	validate
}, null, {  })(SignupForm);


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticateUser }, dispatch);
}


export default connect(null, mapDispatchToProps)(SignupForm)
