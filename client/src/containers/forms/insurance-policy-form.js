import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

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

    onSubmit = (props) => {
        console.log(props);
        // axios.post('/api/patient/insurance/1', props)       
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
                    <Field name="insurance_name" type="text" component={this.renderField} label="Insurance Name"/>
                    <Field name="insurance_type" type="text" component={this.renderField} label="Insurance Type"/>
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
