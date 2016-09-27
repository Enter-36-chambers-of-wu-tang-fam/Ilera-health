import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser } from '../../actions/actions.js';
import CryptoJS from 'crypto-js';

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

  onSubmit(props) {

    axios.post(`/api/${props.userType}/signin`, props)  
      .then( found => {
        let encodedId = CryptoJS.AES.encrypt(String(found.data), 'key');

        localStorage.setItem('uid',encodedId);          
        localStorage.setItem('userType',props.userType);
<<<<<<< 6ef8af97a34b224f292df505bd852dfeb48898b5
        this.props.authenticateUser();       
=======
          
        this.context.router.push(`${props.userType}/dashboard`);
        
>>>>>>> higher-order-component
      })
      .catch( err => {
          console.log("LOGIN ERROR", err);
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
                  <option value="physician">Provider</option>
              </Field>
              {error && <strong>{error}</strong>}
              <button type='submit' className='btn'>Sign In</button>
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

