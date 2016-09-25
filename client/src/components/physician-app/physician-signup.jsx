import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';


const PhysicianSignupForm = ({}) => {

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
            <Field name="address" type="text" component={renderField} label="Street Address"/>
            <Field name="city" type="text" component={renderField} label="City"/>
            <Field name="state" component="select">
                <option value="">Select A State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </Field>
            <Field name="zip" type="text" component={renderField} label="Zip Code"/>
            <Field name="email" type="text" component={renderField} label="Email"/> 
            <Field name="phone_number" type="text" component={renderField} label="Phone Number"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <Field name="reTypePassword" type="password" component={renderField} label="Re-Type Password"/>
        </div>
    );
};

export default PhysicianSignupForm;