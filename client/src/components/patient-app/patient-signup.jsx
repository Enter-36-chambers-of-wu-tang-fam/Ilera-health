import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';


const PatientSignupForm = ({}) => {

    const renderField = ({ input, label, type, meta: { touched, error } }) => {
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

    return (
        <div>
            <Field name="first" type="text" component={renderField} label="First"/>
            <Field name="last" type="text" component={renderField} label="Last"/>
            <Field name="email" type="text" component={renderField} label="Email"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <Field name="reTypePassword" type="password" component={renderField} label="Re-Type Password"/>
        </div>
    );
};

export default PatientSignupForm;