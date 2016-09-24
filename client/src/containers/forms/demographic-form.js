import _ from 'lodash';
import axios from 'axios';
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
  if (!values.city) {
    errors.city = 'Please enter a city'
  }
  return errors
}

class DemographicForm extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    onSubmit = (props) => {
        console.log(props);
        // axios.post('/api/patient/emergency_contacts/1', props)
        this.context.router.push('/emergencyContact')       
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
                <h2>Basic User Info</h2>
                <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
                    <Field name="first" type="text" component={this.renderField} label="First Name"/>
                    <Field name="last" type="text" component={this.renderField} label="Last Name"/>
                    <Field name="phone" type="text" component={this.renderField} label="Date of Birth"/>
                    <Field name="email" type="email" component={this.renderField} label="Street Address"/>
                    <Field name="city" type="text" component={this.renderField} label="City"/>
                    <Field name="state" component="select">
                        <option></option>
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
                    <Field name="zip" type="text" component={this.renderField} label="Zip Code"/>
                    <Field name="email" type="text" component={this.renderField} label="Email"/> 
                    <Field name="phone" type="text" component={this.renderField} label="Phone Number"/>
                    <Field name="weight" type="text" component={this.renderField} label="Weight"/>
                    <Field name="height" type="text" component={this.renderField} label="Height"/>   
                    <Field name="bloodType" component="select">
                        <option></option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </Field>

                    {error && <strong>{error}</strong>}
                    <button type='submit'  className='btn'>Next</button>
                </form>
            </div>
        );
    }   
};

// user types...recorded on application state
export default reduxForm({
    form: 'DemographicForm',
    validate
}, null, { })(DemographicForm);