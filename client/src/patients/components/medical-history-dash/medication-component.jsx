import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


export default class MedicationUpload extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      uploadFiles: []
    }
  }
  onDrop(files) {
    this.setState({
      uploadFiles: files
    })
    console.log('Received files: ', files)
  }

  render () {
    return (
        <div>
        <h1>PDF Uploads Only</h1>
          <Dropzone className="fileUpload" accept="application/pdf" onDrop={this.onDrop.bind(this)}>
            <div>Upload Multiple PDF's.</div>
          </Dropzone>
          {this.state.uploadFiles.length > 0 ? <div>
          <h2>Uploading {this.state.uploadFiles.length} files...</h2>
          <div>{this.state.uploadFiles.map((file,index) => <img src={file.preview} key={index} width="100px" />)}</div>
          </div> : null}
        </div>
    );
  }

};