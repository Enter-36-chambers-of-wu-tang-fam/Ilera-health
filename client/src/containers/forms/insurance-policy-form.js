import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import {
  TextField
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
    this.state = {
      value: '',
      insurer: '',
      insuererType: '',
      network: '',
      insurerSelected: false,
      insurerTypeSelected: false,
      insurers: [1, 2, 3],
      types: [1, 2, 3],
      networks: [],
      docs: []
    };
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

  handleInputChange(e){
    console.log("YOOOOOOOO", e.target.value)
    let query = `https://api.betterdoctor.com/2016-03-01/doctors?query=${e.target.value}&sort=best-match-desc&skip=0&limit=40&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
    if(e.target.value.length > 2){
      axios.get(query)
      .then( result => {
        var docs = [];
        result.data.data.map( doctor => {
          docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title});
        })
        this.setState({docs: docs});
      })
      .catch( err => {
        console.log("ERROR FETCHING DOCTOR INFO")
      })
    }else{
      this.setState({docs: []});
    }
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

  renderSpecialTextField ({ input, label, meta: { touched, error }, ...custom }) {
    return(
      <TextField 
          hintText={label}
          floatingLabelText={label}
          fullWidth={true}
          onChange={this.handleInputChange(value)}
          errorText={touched && error}
          {...input}
          {...custom}
      />
    )
  }

  renderSelectField ({ input, label, meta: { touched, error }, children }) {
		return (
			<SelectField
				floatingLabelText={label}
				errorText={touched && error}
				fullWidth={true}
				{...input}
				onChange={(event, index, value) => input.onChange(value)}
				children={children}/>
		)
	}

  render() {
      const { error, handleSubmit, pristine, reset, submitting } = this.props;

      return (
          <div>
              <h2>Provider Info</h2>
              <form onSubmit={handleSubmit(props => this.submitMe(props))}>
                <h4>PRIMARY CARE</h4>
                <TextField 
                    hintText="Search for Provider"
                    floatingLabelText={"Search for Provider"}
                    fullWidth={true}
                    onChange={this.handleInputChange.bind(this)}
                />
                <ul className={this.state.docs.length ? 'docSearchResult' : 'docSearchResultHide'}>
                  {this.state.docs.map(doc => {
                    return <li>{doc.last_name}, {doc.first_name} {doc.title}</li>
                  })}
                </ul>
                <h4>INSURANCE</h4>
                  <div>
                    <Field name="insurer1" component={this.renderSelectField} label="Insurance Company">
                      {this.state.insurers.map( insurer => {
                        return <MenuItem value={'insurer'} primaryText={insurer}/>
                      })}
                    </Field>
                  </div>
                  <div>
                      <Field name="insurance_type1" component={this.renderSelectField} label="Insurance Type">
                      {this.state.types.map( type => {
                        return <MenuItem value={'type'} primaryText={type}/>
                      })}
                    </Field>
                  </div>
                  <div>
                      <Field name="insurance_network1" component={this.renderSelectField} label="Insurance Network">
                      {this.state.networks.map( network => {
                        return <MenuItem value={'network'} primaryText={network}/>
                      })}
                    </Field>
                  </div>
                  <Field name="policy_number1" type="number" component={this.renderTextField} label="Policy Number"/>
                  <h4>Can't find your insurer? Add yours below.</h4>
                  <Field name="insurer2" type="text" component={this.renderTextField} label="Insurance Company"/>
                  <Field name="insurance_type2" type="text" component={this.renderTextField} label="Insurance Type"/>
                  <Field name="insurance_network2" component={this.renderTextField} label="Insurance Network" />
                  <Field name="policy_number2" type="number" component={this.renderTextField} label="Policy Number"/>
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
                        label={this.props.stepIndex === 4 ? 'Finish' : 'Next'}
                        primary={true}
                        type='submit'
                        className='btn btn-back'
                        style={{
                          float: 'right'
                        }}
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
