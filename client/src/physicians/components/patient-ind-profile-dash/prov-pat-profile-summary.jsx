import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

// CryptoJS
import CryptoJS from 'crypto-js';

const styles = {
  btn: {
    display: 'block',
    margin: '10px auto 15px',
    width: '200px'
  },
};

const validate = values => {
  const errors = {}
  if (values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.newPassword) {
    if(values.newPassword.length < 8){
      errors.newPassword = 'New password must be at least 8 charachters long'
    }
  }

  if (values.reTypePassword && values.reTypePassword !== values.newPassword) {
    errors.reTypePassword = 'Passwords must match'
  }

  return errors
}

class ProfileSum extends Component {

  constructor (props){
    super(props);
    this.state = {
      clicked: false
    }
  }

  submitMe(prop) {
    // decrypt user id
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    prop.uid = code.toString(CryptoJS.enc.Utf8);
    // store form data
    axios.put('/api/patient/password/update', prop)
      .then( found => {
        // this.context.router.push('/patient/form/insurance/');
      })
      .catch( err => {
          console.log("ERROR ENTERING INFORMATION");
      })
  }

  onResetClick(){
    this.setState({clicked: !this.state.clicked})
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
    const { height, error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="profileSummary" style={{
        minHeight: height
      }}>
        <img
          className="profilePic"
          src="http://kurld.com/images/wallpapers/profile-pictures/profile-pictures-15.jpg"
          alt=""
        />
        <h3>
          {`${localStorage.getItem('first')} ${localStorage.getItem('last')}`}
        </h3>
        <RaisedButton
          label="Reset Credentials"
          onClick={this.onResetClick.bind(this)}
          labelColor="white"
          backgroundColor='rgba(242, 108, 44, 1)'
          style={styles.btn}
        />
        <form
          onSubmit={handleSubmit(props => this.submitMe(props))}
          className={this.state.clicked ? 'showPReset' : 'hidePReset'}
        >
          <Field
            name="email"
            type="text"
            component={this.renderTextField}
            label="Email"
          />
          <Field
            name="password"
            type="text"
            component={this.renderTextField}
            label="Old Password"
          />
          <Field
            name="newPassword"
            type="text"
            component={this.renderTextField}
            label="New Password"
          />
          <Field
            name="reTypePassword"
            type="text"
            component={this.renderTextField}
            label="Re-Type New Password"
          />
          {error && <strong>{error}</strong>}
          <RaisedButton
            label='Save'
            primary={true}
            type='submit'
            backgroundColor='rgba(242, 108, 44, 1)'
            style={styles.btn}
          />
        </form>
      </div>
    );
  }
};

ProfileSum = reduxForm({
  form: 'ProfileSum',
  destroyOnUnmount: false,
  validate
})(ProfileSum);

export default ProfileSum;
