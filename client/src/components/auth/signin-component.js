import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser } from '../../actions/actions.js';
import CryptoJS from 'crypto-js';
import RaisedButton from 'material-ui/RaisedButton';
import {
  AutoComplete,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  TextField
} from 'redux-form-material-ui'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Please enter your username'
  }
  if (!values.password) {
    errors.password = 'Password required'
  }
  if (!values.userType) {
    errors.phone = 'Please select an option'
  }
  return errors
}

class SigninForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
			userType: props.userType
		}
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSubmit(props) {
    // console.log(this.state.userType)
    // axios.post(`/api/${this.state.userType}/signin`, props)  
    //   .then( found => {
    //     let encodedId = CryptoJS.AES.encrypt(String(found.data), 'key');

<<<<<<< e91c92eb8e8a57f72317c1ddcad78d826723a8eb
        localStorage.setItem('uid',encodedId);          
        localStorage.setItem('userType',props.userType);
=======
    //     localStorage.setItem('uid',encodedId);          
    //     localStorage.setItem('userType',this.state.userType);
>>>>>>> logout button closes-#173
        
        this.props.authenticateUser(this.state.userType, props, "login");       
          
        //this.context.router.push(`${this.state.userType}/dashboard`); //The higher order component automatically reroutes
      // })
      // .catch( err => {
      //     console.log("LOGIN ERROR", err);
      // })
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
          <h2>{this.state.userType} Sign In</h2>
          <form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
            <div>
              <Field name="email" type="text" component={this.renderTextField} label="Username/Email"/>
            </div>
            <div>
              <Field name="password" type="text" component={this.renderTextField} label="Password"/>
            </div>
            {error && <strong>{error}</strong>}
            <RaisedButton label="Sign In" type='submit' className='btn' style={{
                width: '100%',
                margin: '20px 0 0 0'
              }}/>
          </form>
      </div>
    );
  }   
};

// user types...recorded on application state

SigninForm = reduxForm({
	form: 'SigninForm',
	validate
}, null, {  })(SigninForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticateUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm)

