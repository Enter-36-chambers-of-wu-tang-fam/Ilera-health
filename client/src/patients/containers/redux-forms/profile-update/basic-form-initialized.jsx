// Basic form initialized and used for patient to update their info
// Axios
import axios from 'axios';
// React, Redux, Redux-Form
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { getUserInfo } from '../../../actions/user.js';
// CryptoJS
import CryptoJS from 'crypto-js';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';


const patientStyle = {
	display: {display: 'block'}
}

const providerStyle = {
	display: {display: 'none'}
}

const validate = values => {
  const errors = {}
	if (values.middle && /\d/.test(values.middle)) {
    errors.middle = 'Please enter a valid middle name'
  }

	if (values.maiden && /\d/.test(values.maiden)) {
    errors.maiden = 'Please enter a valid maiden name'
  }
	if (values.birth_city && /\d/.test(values.birth_city)) {
    errors.birth_city = 'Please enter a valid city of birth'
  }
	if (values.primary_language && /\d/.test(values.primary_language)) {
    errors.primary_language = 'Please enter a valid primary language'
  }
	if (values.secondary_language && /\d/.test(values.secondary_language)) {
    errors.secondary_language = 'Please enter a valid secondary language'
  }

  return errors
}

class BackgroundInfoFormInitialized extends Component {

  constructor(props){
    super(props);
		const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
		this.state = {
			patient: status
		}
  }

	// initialize form with user info
  handleInitialize(nextProps){
		const { didInit } = this.props;
		const data = {
			"first": nextProps.user.first,
			"middle": nextProps.user.middle,
			"last": nextProps.user.last,
			"maiden": nextProps.user.maiden,
			"primary_phone_number": nextProps.user.primary_phone_number,
			"secondary_phone_number": nextProps.user.secondary_phone_number,
			"address": nextProps.user.address,
			"city": nextProps.user.city,
			"state": nextProps.user.state,
			"zip": nextProps.user.zip,
			"date_of_birth": nextProps.user.date_of_birth,
			"birth_country": nextProps.user.birth_country,
			"birth_city": nextProps.user.birth_city,
			"marital_status": nextProps.user.marital_status,
			"primary_language": nextProps.user.primary_language,
			"secondary_language": nextProps.user.secondary_language
		}
		this.props.initialize(data);
		nextProps.didInit();
  }

  componentWillReceiveProps(nextProps){
		if(!nextProps.init){
			this.handleInitialize(nextProps);
		}
  }

	submitMe(prop){
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

		axios.put('/api/patient/background', prop)
			.then( found => {
				console.log("DATA UPDATED SUCCESSFULLY");
			})
			.catch( err => {
				console.log("ERROR ENTERING INFORMATION", err);
			})
	}

	renderTextField ({ input, label, disabled, meta: { touched, error } } ) {
		return(
			<TextField
				hintText={label}
				floatingLabelText={label}
				fullWidth={true}
				onChange={(event, index, value) => input.onChange(value)}
				errorText={touched && error}
				disabled={disabled}
				{...input}
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
				<h2>Basic User Info</h2>
				<h6>* Required field</h6>
					<form onSubmit={handleSubmit(props => this.submitMe(props))}>
						<Field name="first" type="text" component={this.renderTextField} label="First Name*" disabled={patient} />
						<Field name="middle" type="text" component={this.renderTextField} label="Middle Name" disabled={patient}/>
						<Field name="last" type="text" component={this.renderTextField} label="Last Name*" disabled={patient}/>
						<Field name="maiden" type="text" component={this.renderTextField} label="Maiden Name" disabled={patient}/>
						<Field name="primary_phone_number" type="text" component={this.renderTextField} label="Primary Phone Number" disabled={patient}/>
           		 		<Field name="secondary_phone_number" type="text" component={this.renderTextField} label="Secondary Phone Number" disabled={patient}/>
						<Field name="address" type="text" component={this.renderTextField} label="Street Address" disabled={patient}/>
						<Field name="city" type="text" component={this.renderTextField} label="City" disabled={patient}/>
						<div>
							<Field name="state" component={this.renderSelectField} label="State" disabled={patient}>
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
						<Field name="zip" type="text" component={this.renderTextField} label="Zip Code" disabled={patient}/>
						<Field name="date_of_birth" label="Date of Birth" component={this.renderTextField} disabled={patient}/>
						<div>
							<Field name="birth_country" component={this.renderSelectField} label="Country of Birth" disabled={patient}>
								<MenuItem value="Afghanistan" primaryText="Afghanistan" />
								<MenuItem value="Åland Islands" primaryText="Åland Islands" />
								<MenuItem value="Albania" primaryText="Albania" />
								<MenuItem value="Algeria" primaryText="Algeria" />
								<MenuItem value="American Samoa" primaryText="American Samoa" />
								<MenuItem value="Andorra" primaryText="Andorra" />
								<MenuItem value="Angola" primaryText="Angola" />
								<MenuItem value="Anguilla" primaryText="Anguilla" />
								<MenuItem value="Antarctica" primaryText="Antarctica" />
								<MenuItem value="Antigua and Barbuda" primaryText="Antigua and Barbuda" />
								<MenuItem value="Argentina" primaryText="Argentina" />
								<MenuItem value="Armenia" primaryText="Armenia" />
								<MenuItem value="Aruba" primaryText="Aruba" />
								<MenuItem value="Australia" primaryText="Australia" />
								<MenuItem value="Austria" primaryText="Austria" />
								<MenuItem value="Azerbaijan" primaryText="Azerbaijan" />
								<MenuItem value="Bahamas" primaryText="Bahamas" />
								<MenuItem value="Bahrain" primaryText="Bahrain" />
								<MenuItem value="Bangladesh" primaryText="Bangladesh" />
								<MenuItem value="Barbados" primaryText="Barbados" />
								<MenuItem value="Belarus" primaryText="Belarus" />
								<MenuItem value="Belgium" primaryText="Belgium" />
								<MenuItem value="Belize" primaryText="Belize" />
								<MenuItem value="Benin" primaryText="Benin" />
								<MenuItem value="Bermuda" primaryText="Bermuda" />
								<MenuItem value="Bhutan" primaryText="Bhutan" />
								<MenuItem value="Bolivia, Plurinational State of" primaryText="Bolivia, Plurinational State of" />
								<MenuItem value="Bonaire, Sint Eustatius and Saba" primaryText="Bonaire, Sint Eustatius and Saba" />
								<MenuItem value="Bosnia and Herzegovina" primaryText="Bosnia and Herzegovina" />
								<MenuItem value="Botswana" primaryText="Botswana" />
								<MenuItem value="Bouvet Island" primaryText="Bouvet Island" />
								<MenuItem value="Brazil" primaryText="Brazil" />
								<MenuItem value="British Indian Ocean Territory" primaryText="British Indian Ocean Territory" />
								<MenuItem value="Brunei Darussalam" primaryText="Brunei Darussalam" />
								<MenuItem value="Bulgaria" primaryText="Bulgaria" />
								<MenuItem value="Burkina Faso" primaryText="Burkina Faso" />
								<MenuItem value="Burundi" primaryText="Burundi" />
								<MenuItem value="Cambodia" primaryText="Cambodia" />
								<MenuItem value="Cameroon" primaryText="Cameroon" />
								<MenuItem value="Canada" primaryText="Canada" />
								<MenuItem value="Cape Verde" primaryText="Cape Verde" />
								<MenuItem value="Cayman Islands" primaryText="Cayman Islands" />
								<MenuItem value="Central African Republic" primaryText="Central African Republic" />
								<MenuItem value="Chad" primaryText="Chad" />
								<MenuItem value="Chile" primaryText="Chile" />
								<MenuItem value="China" primaryText="China" />
								<MenuItem value="Christmas Island" primaryText="Christmas Island" />
								<MenuItem value="Cocos (Keeling) Islands" primaryText="Cocos (Keeling) Islands" />
								<MenuItem value="Colombia" primaryText="Colombia" />
								<MenuItem value="Comoros" primaryText="Comoros" />
								<MenuItem value="Congo" primaryText="Congo" />
								<MenuItem value="Congo, the Democratic Republic of the" primaryText="Congo, the Democratic Republic of the" />
								<MenuItem value="Cook Islands" primaryText="Cook Islands" />
								<MenuItem value="Costa Rica" primaryText="Costa Rica" />
								<MenuItem value="Côte d'Ivoire" primaryText="Côte d'Ivoire" />
								<MenuItem value="Croatia" primaryText="Croatia" />
								<MenuItem value="Cuba" primaryText="Cuba" />
								<MenuItem value="Curaçao" primaryText="Curaçao" />
								<MenuItem value="Cyprus" primaryText="Cyprus" />
								<MenuItem value="Czech Republic" primaryText="Czech Republic" />
								<MenuItem value="Denmark" primaryText="Denmark" />
								<MenuItem value="Djibouti" primaryText="Djibouti" />
								<MenuItem value="Dominica" primaryText="Dominica" />
								<MenuItem value="Dominican Republic" primaryText="Dominican Republic" />
								<MenuItem value="Ecuador" primaryText="Ecuador" />
								<MenuItem value="Egypt" primaryText="Egypt" />
								<MenuItem value="El Salvador" primaryText="El Salvador" />
								<MenuItem value="Equatorial Guinea" primaryText="Equatorial Guinea" />
								<MenuItem value="Eritrea" primaryText="Eritrea" />
								<MenuItem value="Estonia" primaryText="Estonia" />
								<MenuItem value="Ethiopia" primaryText="Ethiopia" />
								<MenuItem value="Falkland Islands (Malvinas)" primaryText="Falkland Islands (Malvinas)" />
								<MenuItem value="Faroe Islands" primaryText="Faroe Islands" />
								<MenuItem value="Fiji" primaryText="Fiji" />
								<MenuItem value="Finland" primaryText="Finland" />
								<MenuItem value="France" primaryText="France" />
								<MenuItem value="French Guiana" primaryText="French Guiana" />
								<MenuItem value="French Polynesia" primaryText="French Polynesia" />
								<MenuItem value="French Southern Territories" primaryText="French Southern Territories" />
								<MenuItem value="Gabon" primaryText="Gabon" />
								<MenuItem value="Gambia" primaryText="Gambia" />
								<MenuItem value="Georgia" primaryText="Georgia" />
								<MenuItem value="Germany" primaryText="Germany" />
								<MenuItem value="Ghana" primaryText="Ghana" />
								<MenuItem value="Gibraltar" primaryText="Gibraltar" />
								<MenuItem value="Greece" primaryText="Greece" />
								<MenuItem value="Greenland" primaryText="Greenland" />
								<MenuItem value="Grenada" primaryText="Grenada" />
								<MenuItem value="Guadeloupe" primaryText="Guadeloupe" />
								<MenuItem value="Guam" primaryText="Guam" />
								<MenuItem value="Guatemala" primaryText="Guatemala" />
								<MenuItem value="Guernsey" primaryText="Guernsey" />
								<MenuItem value="Guinea" primaryText="Guinea" />
								<MenuItem value="Guinea-Bissau" primaryText="Guinea-Bissau" />
								<MenuItem value="Guyana" primaryText="Guyana" />
								<MenuItem value="Haiti" primaryText="Haiti" />
								<MenuItem value="Heard Island and McDonald Islands" primaryText="Heard Island and McDonald Islands" />
								<MenuItem value="Holy See (Vatican City State)" primaryText="Holy See (Vatican City State)" />
								<MenuItem value="Honduras" primaryText="Honduras" />
								<MenuItem value="Hong Kong" primaryText="Hong Kong" />
								<MenuItem value="Hungary" primaryText="Hungary" />
								<MenuItem value="Iceland" primaryText="Iceland" />
								<MenuItem value="India" primaryText="India" />
								<MenuItem value="Indonesia" primaryText="Indonesia" />
								<MenuItem value="Iran, Islamic Republic of" primaryText="Iran, Islamic Republic of" />
								<MenuItem value="Iraq" primaryText="Iraq" />
								<MenuItem value="Ireland" primaryText="Ireland" />
								<MenuItem value="Isle of Man" primaryText="Isle of Man" />
								<MenuItem value="Israel" primaryText="Israel" />
								<MenuItem value="Italy" primaryText="Italy" />
								<MenuItem value="Jamaica" primaryText="Jamaica" />
								<MenuItem value="Japan" primaryText="Japan" />
								<MenuItem value="Jersey" primaryText="Jersey" />
								<MenuItem value="Jordan" primaryText="Jordan" />
								<MenuItem value="Kazakhstan" primaryText="Kazakhstan" />
								<MenuItem value="Kenya" primaryText="Kenya" />
								<MenuItem value="Kiribati" primaryText="Kiribati" />
								<MenuItem value="Korea, Democratic People's Republic of" primaryText="Korea, Democratic People's Republic of" />
								<MenuItem value="Korea, Republic of" primaryText="Korea, Republic of" />
								<MenuItem value="Kuwait" primaryText="Kuwait" />
								<MenuItem value="Kyrgyzstan" primaryText="Kyrgyzstan" />
								<MenuItem value="Lao People's Democratic Republic" primaryText="Lao People's Democratic Republic" />
								<MenuItem value="Latvia" primaryText="Latvia" />
								<MenuItem value="Lebanon" primaryText="Lebanon" />
								<MenuItem value="Lesotho" primaryText="Lesotho" />
								<MenuItem value="Liberia" primaryText="Liberia" />
								<MenuItem value="Libya" primaryText="Libya" />
								<MenuItem value="Liechtenstein" primaryText="Liechtenstein" />
								<MenuItem value="Lithuania" primaryText="Lithuania" />
								<MenuItem value="Luxembourg" primaryText="Luxembourg" />
								<MenuItem value="Macao" primaryText="Macao" />
								<MenuItem value="Macedonia, the former Yugoslav Republic of" primaryText="Macedonia, the former Yugoslav Republic of" />
								<MenuItem value="Madagascar" primaryText="Madagascar" />
								<MenuItem value="Malawi" primaryText="Malawi" />
								<MenuItem value="Malaysia" primaryText="Malaysia" />
								<MenuItem value="Maldives" primaryText="Maldives" />
								<MenuItem value="Mali" primaryText="Mali" />
								<MenuItem value="Malta" primaryText="Malta" />
								<MenuItem value="Marshall Islands" primaryText="Marshall Islands" />
								<MenuItem value="Martinique" primaryText="Martinique" />
								<MenuItem value="Mauritania" primaryText="Mauritania" />
								<MenuItem value="Mauritius" primaryText="Mauritius" />
								<MenuItem value="Mayotte" primaryText="Mayotte" />
								<MenuItem value="Mexico" primaryText="Mexico" />
								<MenuItem value="Micronesia, Federated States of" primaryText="Micronesia, Federated States of" />
								<MenuItem value="Moldova, Republic of" primaryText="Moldova, Republic of" />
								<MenuItem value="Monaco" primaryText="Monaco" />
								<MenuItem value="Mongolia" primaryText="Mongolia" />
								<MenuItem value="Montenegro" primaryText="Montenegro" />
								<MenuItem value="Montserrat" primaryText="Montserrat" />
								<MenuItem value="Morocco" primaryText="Morocco" />
								<MenuItem value="Mozambique" primaryText="Mozambique" />
								<MenuItem value="Myanmar" primaryText="Myanmar" />
								<MenuItem value="Namibia" primaryText="Namibia" />
								<MenuItem value="Nauru" primaryText="Nauru" />
								<MenuItem value="Nepal" primaryText="Nepal" />
								<MenuItem value="Netherlands" primaryText="Netherlands" />
								<MenuItem value="New Caledonia" primaryText="New Caledonia" />
								<MenuItem value="New Zealand" primaryText="New Zealand" />
								<MenuItem value="Nicaragua" primaryText="Nicaragua" />
								<MenuItem value="Niger" primaryText="Niger" />
								<MenuItem value="Nigeria" primaryText="Nigeria" />
								<MenuItem value="Niue" primaryText="Niue" />
								<MenuItem value="Norfolk Island" primaryText="Norfolk Island" />
								<MenuItem value="Northern Mariana Islands" primaryText="Northern Mariana Islands" />
								<MenuItem value="Norway" primaryText="Norway" />
								<MenuItem value="Oman" primaryText="Oman" />
								<MenuItem value="Pakistan" primaryText="Pakistan" />
								<MenuItem value="Palau" primaryText="Palau" />
								<MenuItem value="Palestinian Territory, Occupied" primaryText="Palestinian Territory, Occupied" />
								<MenuItem value="Panama" primaryText="Panama" />
								<MenuItem value="Papua New Guinea" primaryText="Papua New Guinea" />
								<MenuItem value="Paraguay" primaryText="Paraguay" />
								<MenuItem value="Peru" primaryText="Peru" />
								<MenuItem value="Philippines" primaryText="Philippines" />
								<MenuItem value="Pitcairn" primaryText="Pitcairn" />
								<MenuItem value="Poland" primaryText="Poland" />
								<MenuItem value="Portugal" primaryText="Portugal" />
								<MenuItem value="Puerto Rico" primaryText="Puerto Rico" />
								<MenuItem value="Qatar" primaryText="Qatar" />
								<MenuItem value="Réunion" primaryText="Réunion" />
								<MenuItem value="Romania" primaryText="Romania" />
								<MenuItem value="Russian Federation" primaryText="Russian Federation" />
								<MenuItem value="Rwanda" primaryText="Rwanda" />
								<MenuItem value="Saint Barthélemy" primaryText="Saint Barthélemy" />
								<MenuItem value="Saint Helena, Ascension and Tristan da Cunha" primaryText="Saint Helena, Ascension and Tristan da Cunha" />
								<MenuItem value="Saint Kitts and Nevis" primaryText="Saint Kitts and Nevis" />
								<MenuItem value="Saint Lucia" primaryText="Saint Lucia" />
								<MenuItem value="Saint Martin (French part)" primaryText="Saint Martin (French part)" />
								<MenuItem value="Saint Pierre and Miquelon" primaryText="Saint Pierre and Miquelon" />
								<MenuItem value="Saint Vincent and the Grenadines" primaryText="Saint Vincent and the Grenadines" />
								<MenuItem value="Samoa" primaryText="Samoa" />
								<MenuItem value="San Marino" primaryText="San Marino" />
								<MenuItem value="Sao Tome and Principe" primaryText="Sao Tome and Principe" />
								<MenuItem value="Saudi Arabia" primaryText="Saudi Arabia" />
								<MenuItem value="Senegal" primaryText="Senegal" />
								<MenuItem value="Serbia" primaryText="Serbia" />
								<MenuItem value="Seychelles" primaryText="Seychelles" />
								<MenuItem value="Sierra Leone" primaryText="Sierra Leone" />
								<MenuItem value="Singapore" primaryText="Singapore" />
								<MenuItem value="Sint Maarten (Dutch part)" primaryText="Sint Maarten (Dutch part)" />
								<MenuItem value="Slovakia" primaryText="Slovakia" />
								<MenuItem value="Slovenia" primaryText="Slovenia" />
								<MenuItem value="Solomon Islands" primaryText="Solomon Islands" />
								<MenuItem value="Somalia" primaryText="Somalia" />
								<MenuItem value="South Africa" primaryText="South Africa" />
								<MenuItem value="South Georgia and the South Sandwich Islands" primaryText="South Georgia and the South Sandwich Islands" />
								<MenuItem value="South Sudan" primaryText="South Sudan" />
								<MenuItem value="Spain" primaryText="Spain" />
								<MenuItem value="Sri Lanka" primaryText="Sri Lanka" />
								<MenuItem value="Sudan" primaryText="Sudan" />
								<MenuItem value="Suriname" primaryText="Suriname" />
								<MenuItem value="Svalbard and Jan Mayen" primaryText="Svalbard and Jan Mayen" />
								<MenuItem value="Swaziland" primaryText="Swaziland" />
								<MenuItem value="Sweden" primaryText="Sweden" />
								<MenuItem value="Switzerland" primaryText="Switzerland" />
								<MenuItem value="Syrian Arab Republic" primaryText="Syrian Arab Republic" />
								<MenuItem value="Taiwan, Province of China" primaryText="Taiwan, Province of China" />
								<MenuItem value="Tajikistan" primaryText="Tajikistan" />
								<MenuItem value="Tanzania, United Republic of" primaryText="Tanzania, United Republic of" />
								<MenuItem value="Thailand" primaryText="Thailand" />
								<MenuItem value="Timor-Leste" primaryText="Timor-Leste" />
								<MenuItem value="Togo" primaryText="Togo" />
								<MenuItem value="Tokelau" primaryText="Tokelau" />
								<MenuItem value="Tonga" primaryText="Tonga" />
								<MenuItem value="Trinidad and Tobago" primaryText="Trinidad and Tobago" />
								<MenuItem value="Tunisia" primaryText="Tunisia" />
								<MenuItem value="Turkey" primaryText="Turkey" />
								<MenuItem value="Turkmenistan" primaryText="Turkmenistan" />
								<MenuItem value="Turks and Caicos Islands" primaryText="Turks and Caicos Islands" />
								<MenuItem value="Tuvalu" primaryText="Tuvalu" />
								<MenuItem value="Uganda" primaryText="Uganda" />
								<MenuItem value="Ukraine" primaryText="Ukraine" />
								<MenuItem value="United Arab Emirates" primaryText="United Arab Emirates" />
								<MenuItem value="United Kingdom" primaryText="United Kingdom" />
								<MenuItem value="United States" primaryText="United States" />
								<MenuItem value="United States Minor Outlying Islands" primaryText="United States Minor Outlying Islands" />
								<MenuItem value="Uruguay" primaryText="Uruguay" />
								<MenuItem value="Uzbekistan" primaryText="Uzbekistan" />
								<MenuItem value="Vanuatu" primaryText="Vanuatu" />
								<MenuItem value="Venezuela, Bolivarian Republic of" primaryText="Venezuela, Bolivarian Republic of" />
								<MenuItem value="Viet Nam" primaryText="Viet Nam" />
								<MenuItem value="Virgin Islands, British" primaryText="Virgin Islands, British" />
								<MenuItem value="Virgin Islands, U.S." primaryText="Virgin Islands, U.S." />
								<MenuItem value="Wallis and Futuna" primaryText="Wallis and Futuna" />
								<MenuItem value="Western Sahara" primaryText="Western Sahara" />
								<MenuItem value="Yemen" primaryText="Yemen" />
								<MenuItem value="Zambia" primaryText="Zambia" />
								<MenuItem value="Zimbabwe" primaryText="Zimbabwe" />
						</Field>
					</div>
					<Field name="birth_city" type="text" component={this.renderTextField} label="City of Birth" disabled={patient}/>
					<div>
						<Field name="marital_status" component={this.renderSelectField} label="Marital Status" disabled={patient}>
							<MenuItem value={'Married'} primaryText="Married"/>
							<MenuItem value={'Single'} primaryText="Single"/>
							<MenuItem value={'Widow'} primaryText="Widow"/>
							<MenuItem value={'Divorced'} primaryText="Divorced"/>
							<MenuItem value={'Separated'} primaryText="Separated"/>
						</Field>
					</div>
					<Field name="primary_language" type="text" component={this.renderTextField} label="Primary Language" disabled={patient}/>
					<Field name="secondary_language" type="text" component={this.renderTextField} label="Secondary Language" disabled={patient}/>

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

BackgroundInfoFormInitialized = reduxForm({
  form: 'BackgroundInfoFormInitialized',
  destroyOnUnmount: false,
  validate
})(BackgroundInfoFormInitialized);

export default BackgroundInfoFormInitialized;