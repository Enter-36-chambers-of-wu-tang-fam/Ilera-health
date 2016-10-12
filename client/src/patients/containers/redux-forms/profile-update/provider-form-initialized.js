import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import { TextField } from 'redux-form-material-ui';
import request from 'superagent';

const patientStyle = {
	display: {display: 'block'}
}

const providerStyle = {
	display: {display: 'none'}
}

const validate = values => {
  const errors = {}
  if ( values.primary_name && /\d/.test(values.primary_name)) {
    errors.primary_name = 'Please enter a valid name'
  }
  if ( values.primary_city && /\d/.test(values.primary_city)) {
    errors.primary_city = 'Please enter a valid city name'
  }
  if (values.primary_phone && !/^[0-9]+$/.test(values.primary_phone)) {
    errors.primary_phone = 'Invalid phone number - no special charachters'
  }
  
  return errors
};

class ProviderInfoFormInitialized extends Component {

  constructor(props){
    super(props);
    const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
    this.state = {
      value: '',
      insurer: '',
      insuererType: '',
      network: '',
      docSelectedName: '',
      insurerSelected: false,
      insurerTypeSelected: false,
      docSelected: false,
      insurers: [],
      types: [],
      networks: [],
      docs: [],
      docSelectedInfo: {},
      patient: status
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleInitialize(nextProps){
    const data = {
      "betterDoctorUID": nextProps.provider.betterDoctorUID,
      "primary_name": nextProps.provider.primary_name,
      "primary_phone": nextProps.provider.primary_phone,
      "primary_address": nextProps.provider.primary_address,
      "primary_state": nextProps.provider.primary_state,
      "primary_zip": nextProps.provider.primary_zip,
      "insurer1": nextProps.provider.insurer1,
      "insurance_type1": nextProps.provider.insurance_type1,
      "insurance_network1": nextProps.provider.insurance_network1,
      "policy_number1": nextProps.provider.policy_number1,
      "insurer2": nextProps.provider.insurer2,
      "insurance_type2": nextProps.provider.insurance_type2,
      "insurance_network2": nextProps.provider.insurance_network2,
      "policy_number2": nextProps.provider.policy_number2
    }
    this.props.initialize(data);
    nextProps.didInit();
  }

  componentWillReceiveProps(nextProps){
		if(!nextProps.init){
		  this.handleInitialize(nextProps);
	  }
  }

  componentDidMount(){
    axios.get('/api/insurance/insurer')
      .then( found => {
        this.setState({insurers: found.data})
      })
      .catch( err => {
          console.log("ERROR GETTING INFORMATION", err);
      })   
  }

  submitMe(prop) {
    //get encoded id from local storage
		let id = localStorage.getItem('uid');
		//code to decode user id stored in local storage
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);
    prop.insurer1 = this.state.insurer;
    prop.insurance_type1 = this.state.insuererType;
    prop.insurance_network1 = this.state.network;
    prop.betterDoctorUID = this.state.docSelectedInfo.betterDoctorUID;
    axios.put('/api/patient/insurance/update', prop)
      .then( found => {
      })
      .catch( err => {
          console.log("ERROR ENTERING INFORMATION", err);
      })    
  }

  onClick(key){
    this.setState({docSelected: true, docSelectedInfo: this.state.docs[key], docSelectedName: `${this.state.docs[key].last_name},${this.state.docs[key].first_name}`, insurerTypeSelected: true});
  }

onInsurerClick(key){
    console.log(this.state.insurers[key].insurer)
     axios.get(`/api/insurance/insurer/${this.state.insurers[key].insurer}`)
      .then( found => {
        var type = [];
        var network = [];
        found.data.map( insurer =>{
          if(type.indexOf(insurer.type) === -1){
            type.push(insurer.type);
          }
          network.push(insurer.network);
        })
        this.setState({insurerSelected: true, insurer: this.state.insurers[key].insurer, types: type, networks: network});
      })
      .catch( err => {
          console.log("ERROR GETTING INFORMATION", err);
      })   
    
  }

  handleChange (event, index, value) {
    this.setState({value: value});
  } 

  handleInputChange(e){
    this.setState({value: e.target.value});
    let query = `https://api.betterdoctor.com/2016-03-01/doctors?query=${e.target.value}&sort=best-match-desc&skip=0&limit=40&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
    if(e.target.value.length > 2){
    request.get(query)
      .end((err, result) => {
        if (err) { console.error(err) }
        var docs = [];
        
        result.body.data.map( doctor => {
          docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title, npi: doctor.npi, betterDoctorUID: doctor.uid});
        })
        this.setState({docs: docs});
      })
      // .catch( err => { console.log("ERROR FETCHING DOCTOR INFO") })
    }else{
      this.setState({docs: []});
    }
  }

	renderTextField ({ input, label, disabled, meta: { touched, error } } ) {

		return(
			<TextField
				hintText={label}
				floatingLabelText={label}
				fullWidth={true}
				onChange={(event, index, value) => input.onChange(value)}
				disabled={disabled}
				errorText={touched && error}
				{...input}
			/>
		)
	}

  renderSpecialTextField ({ input, label, disabled, meta: { touched, error }, ...custom }) {
    return(
      <TextField 
          hintText={label}
          floatingLabelText={label}
          fullWidth={true}
          onChange={this.handleInputChange(value)}
          disabled={disabled}
          errorText={touched && error}
          {...input}
          {...custom}
      />
    )
  }

  renderSelectField ({ input, label, disabled, meta: { touched, error }, children }) {
		return (
			<SelectField
				floatingLabelText={label}
				errorText={touched && error}
				fullWidth={true}
        disabled={disabled}
				{...input}
				onChange={(event, index, value) => input.onChange(value)}
				children={children}/>
		)
	}

  render() {
      const { error, handleSubmit, pristine, reset, submitting } = this.props;
      const { patient } = this.state;
      return (
          <div  className="forms">
              <h2>Provider Info</h2>
              <form onSubmit={handleSubmit(props => this.submitMe(props))}>
                <h4>PRIMARY CARE</h4>
                <TextField 
                    hintText="Search for Provider"
                    floatingLabelText={"Search for Provider"}
                    fullWidth={true}
                    value={this.state.docSelectedName.length ? this.state.docSelectedName : this.state.value}
                    onChange={this.handleInputChange.bind(this)}
                    disabled={patient}
                />
                <ul className={this.state.docs.length && !this.state.docSelected ? 'docSearchResult' : 'docSearchResultHide'}>
                  {this.state.docs.map( (doc, key) => {
                    return <li  key={key} onClick={this.onClick.bind(this, "primary", key)}>{doc.last_name}, {doc.first_name} {doc.title}</li>
                  })}
                </ul>
                <h5 className="extraTopMargin">Can't find your primary doctor?</h5> 
                <h5>Add yours below.</h5>
                <Field name="primary_name" type="text" component={this.renderTextField} label="Full Name" disabled={patient}/>
                <Field name="primary_phone" type="text" component={this.renderTextField} label="Phone Number" disabled={patient}/>
                <Field name="primary_address" type="text" component={this.renderTextField} label="Address" disabled={patient}/>
                <Field name="primary_city" type="text" component={this.renderTextField} label="City" disabled={patient}/>
                <div>
                  <Field name="primary_state" component={this.renderSelectField} label="State" disabled={patient}>
                    <MenuItem value="AL" primaryTex ="Alabama" />
                    <MenuItem value="AK" primaryText="Alaska" />
                    <MenuItem value="AZ" primaryText="Arizona" />
                    <MenuItem value="AR" primaryText="Arkansas" />
                    <MenuItem value="CA" primaryText="California" />
                    <MenuItem value="CO" primaryText="Colorado" />
                    <MenuItem value="CT" primaryText="Connecticut" />
                    <MenuItem value="DE" primaryText="Delaware" />
                    <MenuItem value="DC" primaryText="District Of Columbia" />
                    <MenuItem value="FL" primaryText="Florida" />
                    <MenuItem value="GA" primaryText="Georgia" />
                    <MenuItem value="HI" primaryText="Hawaii" />
                    <MenuItem value="ID" primaryText="Idaho" />
                    <MenuItem value="IL" primaryText="Illinois" />
                    <MenuItem value="IN" primaryText="Indiana" />
                    <MenuItem value="IA" primaryText="Iowa" />
                    <MenuItem value="KS" primaryText="Kansas" />
                    <MenuItem value="KY" primaryText="Kentucky" />
                    <MenuItem value="LA" primaryText="Louisiana" />
                    <MenuItem value="ME" primaryText="Maine" />
                    <MenuItem value="MD" primaryText="Maryland" />
                    <MenuItem value="MA" primaryText="Massachusetts" />
                    <MenuItem value="MI" primaryText="Michigan" />
                    <MenuItem value="MN" primaryText="Minnesota" />
                    <MenuItem value="MS" primaryText="Mississippi" />
                    <MenuItem value="MO" primaryText="Missouri" />
                    <MenuItem value="MT" primaryText="Montana" />
                    <MenuItem value="NE" primaryText="Nebraska" />
                    <MenuItem value="NV" primaryText="Nevada" />
                    <MenuItem value="NH" primaryText="New Hampshire" />
                    <MenuItem value="NJ" primaryText="New Jersey" />
                    <MenuItem value="NM" primaryText="New Mexico" />
                    <MenuItem value="NY" primaryText="New York" />
                    <MenuItem value="NC" primaryText="North Carolina" />
                    <MenuItem value="ND" primaryText="North Dakota" />
                    <MenuItem value="OH" primaryText="Ohio" />
                    <MenuItem value="OK" primaryText="Oklahoma" />
                    <MenuItem value="OR" primaryText="Oregon" />
                    <MenuItem value="PA" primaryText="Pennsylvania" />
                    <MenuItem value="RI" primaryText="Rhode Island" />
                    <MenuItem value="SC" primaryText="South Carolina" />
                    <MenuItem value="SD" primaryText="South Dakota" />
                    <MenuItem value="TN" primaryText="Tennessee" />
                    <MenuItem value="TX" primaryText="Texas" />
                    <MenuItem value="UT" primaryText="Utah" />
                    <MenuItem value="VT" primaryText="Vermont" />
                    <MenuItem value="VA" primaryText="Virginia" />
                    <MenuItem value="WA" primaryText="Washington" />
                    <MenuItem value="WV" primaryText="West Virginia" />
                    <MenuItem value="WI" primaryText="Wisconsin" />
                    <MenuItem value="WY" primaryText="Wyoming" />
                  </Field>
                </div>
                <Field name="primary_zip" type="text" component={this.renderTextField} label="Zip Code" disabled={patient}/>
                <h4>INSURANCE</h4>
                  <div>
                    <Field name="insurer1" component={this.renderSelectField} label="Insurance Company" disabled={patient}>
                      {this.state.insurers.map( (insurer, key) => {
                        return <MenuItem key={key} onClick={this.onInsurerClick.bind(this, key)} value={insurer.insurer} primaryText={insurer.insurer} />
                      })}
                    </Field>
                  </div>
                  <div>
                      <Field name="insurance_type1" component={this.renderSelectField} label="Insurance Type" disabled={patient}>
                      {this.state.types.map( (type, key) => {
                        return <MenuItem value={type} primaryText={type} onClick={this.onClick.bind(this, "insurerType", key)} key={key}/>
                      })}
                    </Field>
                  </div>
                  <div>
                      <Field name="insurance_network1" component={this.renderSelectField} label="Insurance Network" disabled={patient}>
                      {this.state.networks.map( (network, key) => {
                        return <MenuItem value={network} primaryText={network} onClick={this.onClick.bind(this, "network", key)} key={key}/>
                      })}
                    </Field>
                  </div>
                  <Field name="policy_number1" type="number" component={this.renderTextField} label="Policy Number" disabled={patient}/>
                  <h5 className="extraTopMargin">Can't find your insurer?</h5> 
                  <h5>Add yours below.</h5>
                  <Field name="insurer2" type="text" component={this.renderTextField} label="Insurance Company" disabled={patient}/>
                  <Field name="insurance_type2" type="text" component={this.renderTextField} label="Insurance Type" disabled={patient}/>
                  <Field name="insurance_network2" component={this.renderTextField} label="Insurance Network" disabled={patient} />
                  <Field name="policy_number2" type="number" component={this.renderTextField} label="Policy Number" disabled={patient}/>
                  {error && <strong>{error}</strong>}
                  <RaisedButton
                      label='Save'
                      primary={true}
                      type='submit'
                      style={patient ? providerStyle.display : patientStyle.display}
                  />
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
})(ProviderInfoFormInitialized);
