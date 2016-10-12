// Axios
import axios from 'axios';
// React / Redux
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import { TextField } from 'redux-form-material-ui';
// Crypto
import CryptoJS from 'crypto-js';


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

class InsuranceForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: '',
      insurer: '',
      insurerType: '',
      network: '',
      docSelectedName: '',
      insurerSelected: false,
      insurerTypeSelected: false,
      networkSelected: false,
      docSelected: false,
      insurers: [],
      types: [],
      networks: [],
      docs: [],
      docSelectedInfo: {}
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  // get our list of insurers
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
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);
    prop.insurer1 = this.state.insurer;
    prop.insurance_type1 = this.state.insurerType;
    prop.insurance_network1 = this.state.network;
    prop.betterDoctorUID = this.state.docSelectedInfo.betterDoctorUID;

    // if first time use post, otherwise, use put
    if( (localStorage.getItem('providerSubmitted')) === "true" ){
      axios.put('/api/patient/insurance/update', prop)
        .then( found => {
          this.context.router.push('/patient/dashboard');
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION", err);
        })  
    } else {
      axios.post('/api/patient/insurance', prop)
        .then( found => {
          localStorage.setItem('providerSubmitted', true)
          this.context.router.push('/patient/dashboard');
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION", err);
        })   
    } 
  }

	// update stepper
	// see patient-signup-forms.jsx
  getStepContent(){
    let steps=this.props.stepIndex;
    this.props.getStepContent(steps);
	}

	// update stepper
	// see patient-signup-forms.jsx
	handlePrev(){
    this.props.handlePrev();
	}

	// update stepper
	// see patient-signup-forms.jsx
	handleNext(){
    this.props.handleNext();
	}

  // update state with user's input
  onClick(type, key){
    if(type === "primary"){
      this.setState({docSelected: true, docSelectedInfo: this.state.docs[key], docSelectedName: `${this.state.docs[key].last_name},${this.state.docs[key].first_name}`, insurerTypeSelected: true});
    }

    if(type === "insurerType"){
      this.setState({insurerType: this.state.types[key], insurerTypeSelected: true});
    }

    if(type === "network"){
      this.setState({network: this.state.networks[key], networkSelected: true});
    }
    
  }

  // if user selects an insurer from dropdown, get that insurers network info
  onInsurerClick(key){
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

  // get matching doctors from Better Doctor API
  handleInputChange(e){
    this.setState({value: e.target.value});
    let query = `https://api.betterdoctor.com/2016-03-01/doctors?query=${e.target.value}&sort=best-match-desc&skip=0&limit=40&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
    if(e.target.value.length > 2){
      axios.get(query)
      .then( result => {
        var docs = [];
        
        result.data.data.map( doctor => {
          docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title, npi: doctor.npi, betterDoctorUID: doctor.uid});
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
          />
          <ul className={this.state.docs.length && !this.state.docSelected ? 'docSearchResult' : 'docSearchResultHide'}>
            {this.state.docs.map( (doc, key) => {
              return <li onClick={this.onClick.bind(this, "primary", key)}>{doc.last_name}, {doc.first_name} {doc.title}</li>
            })}
          </ul>
          <h5 className="extraTopMargin">Can't find your primary doctor?</h5> 
          <h5>Add yours below.</h5>
          <Field name="primary_name" type="text" component={this.renderTextField} label="Full Name"/>
          <Field name="primary_phone" type="text" component={this.renderTextField} label="Phone Number"/>
          <Field name="primary_address" type="text" component={this.renderTextField} label="Address"/>
          <Field name="primary_city" type="text" component={this.renderTextField} label="City"/>
          <div>
            <Field name="primary_state" component={this.renderSelectField} label="State">
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
          <Field name="primary_zip" type="text" component={this.renderTextField} label="Zip Code"/>
          <h4>INSURANCE</h4>
            <div>
              <Field name="insurer1" component={this.renderSelectField} label="Insurance Company">
                {this.state.insurers.map( (insurer, key) => {
                  return <MenuItem key={key} onClick={this.onInsurerClick.bind(this, key)} value={insurer.insurer} primaryText={insurer.insurer} />
                })}
              </Field>
            </div>
            <div>
                <Field name="insurance_type1" component={this.renderSelectField} label="Insurance Type">
                {this.state.types.map( (type, key) => {
                  return <MenuItem value={type} primaryText={type} onClick={this.onClick.bind(this, "insurerType", key)} key={key}/>
                })}
              </Field>
            </div>
            <div>
                <Field name="insurance_network1" component={this.renderSelectField} label="Insurance Network">
                {this.state.networks.map( (network, key) => {
                  return <MenuItem value={network} primaryText={network} onClick={this.onClick.bind(this, "network", key)} key={key}/>
                })}
              </Field>
            </div>
            <Field name="policy_number1" type="number" component={this.renderTextField} label="Policy Number"/>
            <h5 className="extraTopMargin">Can't find your insurer?</h5> 
            <h5>Add yours below.</h5>
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