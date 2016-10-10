import React, { Component, PropTypes, } from 'react';
import { reduxForm, Field } from 'redux-form';
import normalizeDate from './normalizeDate'
import Dropzone from 'react-dropzone';
import CryptoJS from 'crypto-js';
import request from 'superagent';
import axios from 'axios';

const FILE_FIELD_NAME = 'files';


const styles = {
 dropzone: {
    background: "rgb(0, 204, 204)",
    color: "rgb(255,255,255)",
    borderRadius: "0.2em",
    padding: ".5em 0em",
    width: "10em",
    margin: "0 auto",
    border: "none",
    cursor:"pointer",   
  },
  dropHover: {
    cursor: "pointer",
    background:"#099",
    transition:'background .2s'
  }
};

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        multiple={false} 
        style={styles.dropzone} 
        activeStyle={styles.dropHover}
      >
        <div>Upload Files</div>
      </Dropzone>
      <br />
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class UploadRecordForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    router: React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state={
      submitted: false,
      message: null,
      errorMessage: null
    }
  }
  onSubmit(data) {
    let that = this;

    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    
    var body = new FormData();
    body.append('upload',data.files[0]);
    body.append('date',data.date);
    body.append('description', data.description);
    body.append('type', data.type);

    axios.post(`/upload/old_records/${uid}`, body)
      .then(resp => {
        that.setState({submitted: true, message:"Your document was submitted!"})
    })
    .catch(error => {
      that.setState({submitted: false, errorMessage:"There was an error with your submission, please try again"})
      console.log(error)
    })
  }

  componentWillUpdate(){
    this.state.submitted ? this.context.router.push('/patient/records') : ''; 
  }

  render() {
    const { handleSubmit, reset} = this.props;
    return (
      <div className="uploadRecordPage">  
        <p className="successmsg">{this.state.message}</p>
        <p className="errormsg">{this.state.errorMessage}</p>
      <br/>
      <br/>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <Field
              name={FILE_FIELD_NAME}
              component={renderDropzoneInput}
            />
          </div>
            <label htmlFor="date">Date </label>
            <Field 
              name="date" 
              component="input" 
              placeholder="YYYY-MM-DD (2016-01-21)"
              normalize={normalizeDate}
            />
            <br/>
            <label htmlFor="type">Type </label>
            <Field name="type" component="select">
              <option value="Health Record">Health Record</option>
              <option value="Labs & Tests">Labs & Tests</option>
              <option value="Radiology">Radiology Images</option>
              <option value="Other">Other</option>
            </Field>
            <br/>
            <label htmlFor="description">Description </label>
            <Field
              name="description"
              component="input"
            />
          <div>
          <br/>
            <button className="formButton" type="submit">
              Submit
            </button>
            <button className="formButton" onClick={reset}>
              Clear Values
            </button>
            <br/>
            <a href="/patient/records" className="uploadRecord">View Records</a>
          </div>
        </form>
      </div>  
    );
  }
}

export default reduxForm({
  form: 'UploadRecordForm',
})(UploadRecordForm);