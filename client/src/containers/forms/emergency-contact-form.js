import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// Actions
import { createEmergencyContact } from '..actions/..'

const FIELDS = {
    first : {
        type: 'input',
        label: 'First Name',
        specific: 'text',
        error: 'Enter a first name'
    },
    last : {
        type: 'input',
        label: 'Last Name',
        specific: 'text',
        error: 'Enter a last name'
    },
    phone : {
        type: 'input',
        label: 'Phone Number',
        specific: 'text',
        error: 'Enter a phone number'
    },
    email : {
        type: 'input',
        label: 'Email',
        specific: 'email',
        error: 'Enter an email'
    },
    relationship : {
        type: 'input',
        label: 'Relationship',
        specific: 'text',
        error: 'Enter a value'
    }
}

class EmergencyContactForm extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    onFormSubmit(props) {
        this.props.createEmergencyContact(props)
            .then(() => {
                // if form submitted successfully, send user 
                // to next form
                this.context.router.push('/patient/insurance')
            });
    }

    renderFormField(fieldConfig, field) {
        const fieldHelper = this.props.fields[field];

        return (
            <div className={ `${fieldHelper.touched && fieldHelper.invalid ? 'invalidInput' : ''}` }>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type={fieldConfig.specific} {...fieldHelper} />
                <div className='formErrors'>
                    { fieldHelper.touched ? fieldHelper.error : '' }
                </div>
            </div>
        )
    }

    render() {
        const { fields: { first, last, phone, email, relationship }, handleSubmit } = this.props;

        return (
            <div>
                <h2>Emergency Contact Info</h2>
                <form onSubmit={ handleSubmit(this.onFormSubmit.bind(this)) }>
                    
                    {_.map(FIELDS, this.renderFormField.bind(this))}

                    <button type='submit' className='btn'>Next</button>
                </form>
            </div>
        );
    }   
};

// form validation run before submit
function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if(!values[field]) {
            errors[field] = field.error
        }
    })

    return errors;
}

// user types...recorded on application state
export default reduxForm({
    form: 'EmergencyContactForm',
    fields: _.keys(FIELDS),
    validate
}, null, { createEmergencyContact })(EmergencyContactForm);