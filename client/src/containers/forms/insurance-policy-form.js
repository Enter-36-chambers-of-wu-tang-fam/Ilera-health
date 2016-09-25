import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import CryptoJS from 'crypto-js';

const validate = values => {
  const errors = {}
  if (!values.insurance_name) {
    errors.insurance_name = 'Please enter an insurance name'
  }
  if (!values.insurance_type) {
    errors.insurance_type = 'Please enter an insurance type'
  }
  if (!values.policy_number) {
    errors.policy_number = 'Please enter a policy number'
  }
  return errors
};

class InsuranceForm extends Component {

  constructor(props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSubmit(props){
    
    //get encoded id from local storage
    let id = localStorage.getItem('uid');
    //code to decode user id stored in local storage
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
     props.uid = code.toString(CryptoJS.enc.Utf8);
     props.id_insurance_client = '1'; //created sample data to test, will need to add
     //sample data --> insert into insurance_company_client(company_name,username,password) VALUES('aetna','John','King');
    axios.post('/api/patient/insurance', props)
    .then( found => {
      this.context.router.push('/patient/dashboard/');
    })
    .catch( err => {
        console.log("ERROR ENTERING INFORMATION");
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
              <h2>Insurance Info</h2>
              <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
                  <Field name="company_name" type="text" component={this.renderField} label="Insurance Name"/>
                  <Field name="type" type="text" component={this.renderField} label="Insurance Type"/>
                  <Field name="policy_number" type="number" component={this.renderField} label="Policy Number"/>
                  {error && <strong>{error}</strong>}
                  <Link to='/patient/form/emergencyContact' >
                      <div className='btn'> Back </div>
                  </Link>
                  <button type='submit' className='btn'>Go to Dashboard</button>
              </form>
          </div>
      );
  }   
};

// user types...recorded on application state
export default reduxForm({
    form: 'InsuranceContactForm',
    validate
}, null, { })(InsuranceForm);
