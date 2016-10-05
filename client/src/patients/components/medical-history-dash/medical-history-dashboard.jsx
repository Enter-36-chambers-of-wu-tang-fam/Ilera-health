import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ajax from 'superagent'; //usually aliased as request, this is not actually jQuery ajax
import axios from 'axios';


export default class DropzoneDemo extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      uploadFiles: []
    }
  }
  onDrop(files) {
    this.setState({
      uploadFiles: files
    });
    
    var fileData = {
      name: files[0].name,
      path: files[0].preview,
      type: files[0].type,
      size: files[0].size
    }

    axios.post('/upload/medRecord', fileData)
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });

    // ajax.post('/upload/medRecord')
    // .set('Access-Control-Allow-Origin', '*')
    // .withCredentials()
    // .send(files[0])
    // .end((err,res) =>{
    //   if(err) console.log(err);
    //   if(res) console.log(res);
    // });

      // var req = ajax.post('/upload/medRecord');
      //   files.forEach((file)=> {
      //       req.attach(file.name, file);
      //   });
      //   req.end((err,res) => {
      //     if(err) console.log(err);
      //     console.log(res);

      //   });

    console.log('Received files: ', files)
  }

  render () {
    return (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)}>
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