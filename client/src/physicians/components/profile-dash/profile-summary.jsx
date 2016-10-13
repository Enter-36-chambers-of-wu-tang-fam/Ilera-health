// React / Redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
// Actions
import { getProvider } from '../../actions/user.js';
// Photo Uploader
import Dropzone from 'react-dropzone';
import request from 'superagent';
// CryptoJS
import CryptoJS from 'crypto-js';

const styles = {
  btn: {
    display: 'block',
    margin: '10px auto 15px',
    width: '200px'
  },
 dropzone: {
    width:'',
    height:'',
    border:'none',
    borderRadius:'50%',
    maxWidth:'200px',
    margin:"0 auto"
  },
  dropHover: {
    boxShadow:'0em 0em .5em .4em rgba(242,108,44,.8)',
    transition:'box-shadow .3s'
  },
  inputStyle: {
    color: '#f1f1f1'
  },
   hintStyle: {
    color: "#CCC",
  },
  floatingLabelStyle: {
    color: "CCC",
  },
  floatingLabelFocusStyle: {
    color: "#0CC"
  }
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

class ProfileSummary extends Component {

    constructor (props){
      super(props);
      this.state = {
        clicked: false,
        uploadFiles: []
      }
    }

    componentWillMount(){
      const { load } = this.props;
	    let id = localStorage.getItem('uid');
		  let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		  let uid = code.toString(CryptoJS.enc.Utf8);

      load(uid);
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

    //picture upload
     onDrop(file) {
	    const { load } = this.props;
	    let id = localStorage.getItem('uid');
		  let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		  let uid = code.toString(CryptoJS.enc.Utf8);

      var upload = new FormData();
      upload.append('upload',file[0]);
      request.post(`/upload/profile_picture/${uid}`)
      .send(upload)
      .end(function(err, resp){
        if (err) { console.error(err) }
    });

    this.setState({
      uploadFiles: file[0]
    });

    load(uid);
  }

  // componentWillUpdate(){
  //     const { load } = this.props;
	//     let id = localStorage.getItem('uid');
	// 	  let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
	// 	  let uid = code.toString(CryptoJS.enc.Utf8);
  //     load(uid);
  // }

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
              hintStyle={styles.hintStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              {...props}
          />
        )
      }

    render() {
      const { height, error, handleSubmit, pristine, reset, submitting } = this.props;
      const profilePicture = {
        backgroundImage: `url(${this.state.uploadFiles.length > 0 ?
          this.state.uploadFiles.preview : this.props.user.photo_path === null ?
          '/styles/defaults/default_photo.png' : this.props.user.photo_path})`,
        backgroundSize:'cover'
    };
      return (
          <div className="profileSummary" style={{
            minHeight: height,
            color: '#fff',
            background: "rgba(13,34,51,.8)"
          }}>
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              multiple={false}
              style={styles.dropzone}
              activeStyle={styles.dropHover}
              accept="image/*"
            >
              <div
                className="profilePic"
                style={profilePicture}
              >
                <div
                  className="profilePic_overlay"
                >
                  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                  Drag & Drop!
                </div>
              </div>
            </Dropzone>

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
              className={this.state.clicked ?
                 'showPReset' : 'hidePReset'}
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

ProfileSummary = reduxForm({
  form: 'ProviderPasswordReset',
  destroyOnUnmount: false,
  validate
})(ProfileSummary);

export default connect(
 state => ({
    user: state.provider || {},
  }),
  {
    load: getProvider,
  })(ProfileSummary);
