import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// Actions
import { emergencyContact } from '../../actions/actions.js';

const validate = values => {
  const errors = {}
  if (!values.first) {
    errors.first = 'Please enter a first name'
  }
  if (!values.last) {
    errors.last = 'Please enter a last name'
  }
  if (!values.phone) {
    errors.phone = 'Please enter a phone number'
  }
  if (!values.email) {
    errors.email = 'Please enter an email'
  }
  if (!values.relationship) {
    errors.relationship = 'Please enter a value'
  }
  return errors
}

class EmergencyContactForm extends Component {

    onSubmit(props) {
        console.log("EMERGENCY", emergencyContact)
        console.log("PROPS", props)
        axios.post(`api/patient/emergency_contacts/1`, props)
            .then(success => {
                console.log(getState());
            })
            .catch(err => {
                console.log(store.getState());
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
                <h2>Emergency Contact Info</h2>
                <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
                    <Field name="first" type="text" component={this.renderField} label="First Name"/>
                    <Field name="last" type="text" component={this.renderField} label="Last Name"/>
                    <Field name="phone" type="text" component={this.renderField} label="Phone Number"/>
                    <Field name="email" type="email" component={this.renderField} label="Email"/>
                    <Field name="relationship" type="text" component={this.renderField} label="Relationship"/>
                    {error && <strong>{error}</strong>}
                    <button type='submit'  className='btn'>Next</button>
                </form>
            </div>
        );
    }   
};

// user types...recorded on application state
export default reduxForm({
    form: 'EmergencyContactForm',
    validate
}, null, { emergencyContact })(EmergencyContactForm);