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
  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email'
  }
  if (!values.password) {
    errors.password = 'Password required.'
  }

  return errors
}

class SigninForm extends Component {
  
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
    this.props.authenticateUser(this.state.userType, props, "login");
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
          <h2>{this.state.userType} Sign In</h2>
          <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
            <div>
              <Field name="email" type="text" component={this.renderTextField} label="Username (Email)"/>
            </div>
            <div>
              <Field name="password" type="password" component={this.renderTextField} label="Password"/>
            </div>
            {error && <strong>{error}</strong>}
            <RaisedButton label="Sign In" type='submit' className='btn' style={{
                width: '100%',
                margin: '20px 0 0 0'
              }}/>
          </form>
      </div>
    );
  }   
};

// user types...recorded on application state

SigninForm = reduxForm({
	form: 'SigninForm',
	validate
}, null, {  })(SigninForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticateUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm)

