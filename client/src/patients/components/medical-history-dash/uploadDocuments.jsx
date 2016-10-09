import React, { Component, PropTypes, } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import CryptoJS from 'crypto-js';
import request from 'superagent';
import axios from 'axios';

const FILE_FIELD_NAME = 'files';

const styles = {
 dropzone: {
    width:'',
    height:'',
    border:'none',
    borderRadius:'',
    maxWidth:'205px',
    margin:"0 auto"
  },
  dropHover: {
    boxShadow:'0em 0em .5em .4em rgba(242,108,44,.8)',
    background:'rgba(0,0,0,.7)',
    transition:'border .3s, box-shadow .3s'
  }
};

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
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

class App extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  onSubmit(data) {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    console.log("I AM CALLED I AM CALLED I AM CALLED")
    var body = new FormData();
    body.append('upload',data.files[0]);
    body.append('date',data.date);
    body.append('description', data.description);
    body.append('type', data.type);

    axios.post(`/upload/old_records/${uid}`, body)
      .then(resp => {
        console.log("RESPONSE", resp);
    })
    .catch(error => console.log(error))
  }

  render() {
    const { handleSubmit, reset} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}
          />
        </div>
          <label htmlFor="date">Date</label>
          <Field
            name="date"
            component="input"
          />
          <label htmlFor="type">Type</label>
          <Field
            name="type"
            component="input"
          />
          <label htmlFor="description">Description</label>
          <Field
            name="description"
            component="input"
          />
        <div>
          <button type="submit">
            Submit
          </button>
          <button onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simple',
})(App);