import React, { Component } from 'react';
import EmergencyContactForm from '../../containers/forms/emergency-contact-form.js';
import InsuranceForm from '../../containers/forms/insurance-policy-form.js';

export default class UpdatePatient extends Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div>
        <EmergencyContactForm />
        <InsuranceForm />
      </div>
    );
  }

}
