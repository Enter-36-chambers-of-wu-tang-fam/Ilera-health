import axios from 'axios';
// React / Redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// Material UIDimport FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
// Actions
import { getProvider, didInit } from '../../actions/user.js';
// CryptoJS
import CryptoJS from 'crypto-js';

class ProviderProfileUpdate extends Component {

    constructor (props){
      super(props)
    }

    handleInitialize(nextProps){
      console.log("HELLO", nextProps)
      const { didInit } = this.props;
      const data = {
        "betterDoctorUID": nextProps.user.betterDoctorUID,
        "first": nextProps.user.first,
        "last": nextProps.user.last,
        "phone_number": nextProps.user.phone_number,
        "specialty": nextProps.user.specialty
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
		//get encoded id from local storage
		let id = localStorage.getItem('uid');
		//code to decode user id stored in local storage
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		prop.uid = code.toString(CryptoJS.enc.Utf8);

		axios.put('/api/physician/background', prop)
			.then( found => {
				// this.context.router.push('/patient/form/emergencyContact/');
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

    render() {
      const { error, handleSubmit, pristine, reset, submitting } = this.props;
      return (
          <div className="profileRight">
            <h2>Basic User Info</h2>
						<form
              onSubmit={handleSubmit(props => this.submitMe(props))}
            >
							<Field
                name="betterDoctorUID"
                type="text"
                component={this.renderTextField}
                label="Better Doctor UID"
              />
							<Field
                name="first"
                type="text"
                component={this.renderTextField}
                label="First Name*"
              />
							<Field
                name="last"
                type="text"
                component={this.renderTextField}
                label="Last Name*"
                />
							<Field
                name="phone_number"
                type="text"
                component={this.renderTextField}
                label="Phone Number"
              />
							<Field
                name="specialty"
                type="text"
                component={this.renderTextField}
                label="Specialty"
              />

						{error && <strong>{error}</strong>}
								<FlatButton
									label='Update'
									primary={true}
									type='submit'
								/>
					  </form>
        </div>
      );
    }
}


ProviderProfileUpdate = reduxForm({
  form: 'ProviderProfileUpdate'
})(ProviderProfileUpdate);

export default connect(
  state => ({
    user: state.provider.provider,
		init: state.provider.init
  }),
  {
	  load: getProvider,
	  didInit: didInit
  }
)(ProviderProfileUpdate)
