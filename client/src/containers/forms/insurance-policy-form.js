import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  Slider,
  TextField,
  Toggle,
  MenuItem
} from 'redux-form-material-ui';

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

  submitMe(prop) {
    //get encoded id from local storage
		let id = localStorage.getItem('uid');
		//code to decode user id stored in local storage
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

    axios.post('/api/patient/insurance', prop)
      .then( found => {
        this.context.router.push('/patient/dashboard');
      })
      .catch( err => {
          console.log("ERROR ENTERING INFORMATION", err);
      })    
  }

  getStepContent(){
    let steps=this.props.stepIndex;
    this.props.getStepContent(steps);
	}

	handlePrev(){
    this.props.handlePrev();
	}

	handleNext(){
    this.props.handleNext();
	}

  renderTextField (props) {
        return(
        <TextField 
            hintText={props.label}
            floatingLabelText={props.label}
            fullWidth={true}
            errorText={props.touched && props.error}
            {...props}
        />
        )
    }

  render() {
      const { error, handleSubmit, pristine, reset, submitting } = this.props;

      return (
          <div>
              <h2>Insurance Info</h2>
              <form onSubmit={handleSubmit(props => this.submitMe(props))}>
                  <Field name="company_name" type="text" component={this.renderTextField} label="Insurance Name"/>
                  <Field name="type" type="text" component={this.renderTextField} label="Insurance Type"/>
                  <Field name="policy_number" type="number" component={this.renderTextField} label="Policy Number"/>
                  {error && <strong>{error}</strong>}
                  <div className="formBtns clearfix">
                    <div>{this.getStepContent(this.props.stepIndex)}</div>
                    <div style={{marginTop: 12}}>
                      <FlatButton
                        label="Back"
                        disabled={this.props.stepIndex === 0}
                        onTouchTap={this.handlePrev.bind(this)}
                        style={{marginRight: 12}}
                        className='btn btn-back'
                      />
                      <RaisedButton
                        label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
                        primary={true}
                        type='submit'
                        className='btn btn-back'
                      />
                    </div>
                  </div> 
              </form>
          </div>
      );
  }   
};

// user types...recorded on application state
export default reduxForm({
    form: 'InsuranceContactForm',
    destroyOnUnmount: false,
    validate
})(InsuranceForm);
