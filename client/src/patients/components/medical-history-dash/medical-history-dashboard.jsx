import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent'; //usually aliased as request, this is not actually jQuery ajax
import axios from 'axios';


export default class DropzoneDemo extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      uploadFiles: []
    }
  }
  onDrop(file) {
    this.setState({
      uploadFiles: file
    });
    var upload = new FormData();
    upload.append('upload',file[0]);

    request.post('/upload/medRecord')
    .send(upload)
    .end(function(err, resp){
      if (err) { console.error(err) }
      console.log(resp);
      return resp;
    });

    console.log('Received files: ', file)
  }

  render () {
    return (
        <div>
        <img src="/src/uploads/b82d69ab48161c0cb240406fe1cd2efb1475851266407.jpeg" />
          <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          {this.state.uploadFiles.length > 0 ? <div>
          <h2>Uploading {this.state.uploadFiles.length} files...</h2>
          <div>{this.state.uploadFiles.map((file,index) => <img src={file.preview} key={index} width="100px" />)}</div>
          </div> : null}
        </div>
    );
  }

};