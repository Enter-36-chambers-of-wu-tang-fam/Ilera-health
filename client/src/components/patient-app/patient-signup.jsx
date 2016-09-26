import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui'

const PatientSignupForm = ({}) => {

		const renderTextField = props => (
			<TextField hintText={props.label}
				floatingLabelText={props.label}
				errorText={props.touched && props.error}
				{...props}
			/>
		)

    return (
        <div>
						<div>
            	<Field name="first" type="text" component={renderTextField} label="First"/>
						</div>
						<div>
            	<Field name="last" type="text" component={renderTextField} label="Last"/>
						</div>
						<div>
            	<Field name="email" type="text" component={renderTextField} label="Email"/>
						</div>
						<div>
            	<Field name="password" type="password" component={renderTextField} label="Password"/>
						</div>
						<div>
            	<Field name="reTypePassword" type="password" component={renderTextField} label="Re-Type Password"/>
						</div>
        </div>
    );
};

export default PatientSignupForm;