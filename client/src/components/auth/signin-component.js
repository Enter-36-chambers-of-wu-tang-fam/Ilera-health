import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Please enter your username'
  }
  if (!values.password) {
    errors.password = 'Password required'
  }
  if (!values.userType) {
    errors.phone = 'Please select an option'
  }
  return errors
}

class SigninForm extends Component {
  constructor(props){
    super(props);
  }

  static contextTypes = {
      router: React.PropTypes.object
  }

  onSubmit = (props) => {
    console.log(props);
    axios.post(`/api/${props.userType}/signin`, props)  
      .then( found => {
          console.log("SUCCESS");
          this.context.router.push(`${props.userType}/dashboard`)
      })
      .catch( err => {
          console.log("LOGIN ERROR")
      })
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return(
      <div key={label}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} />
        <div className='formErrors'>
            { touched && error && <span>{error}</span> }
        </div>
      </div>
    )
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div>
          <h2>Sign In</h2>
          <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
              <Field name="email" type="text" component={this.renderField} label="Username"/>
              <Field name="password" type="password" component={this.renderField} label="Password"/>
              <Field name="userType" component="select">
                  <option></option>
                  <option value="patient">Patient</option>
                  <option value="provider">Provider</option>
              </Field>
              {error && <strong>{error}</strong>}
              <button type='submit' className='btn'>Sign In</button>
          </form>
      </div>
    );
  }   
};

// user types...recorded on application state
export default reduxForm({
    form: 'SigninForm',
    validate
}, null, {  })(SigninForm);