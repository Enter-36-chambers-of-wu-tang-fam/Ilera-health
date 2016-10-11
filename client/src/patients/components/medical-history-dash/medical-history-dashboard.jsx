import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecords, deleteRecords } from '../../actions/records.js';
import CryptoJS from 'crypto-js';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  clearFix: {
    clear: "both"
  }
};



class RecordsDashboard extends Component{
  
  constructor(props){
    super(props);
    const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
    this.state = {
      records: [],
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '200px',

      patient:status
    }
  }
  componentWillMount(){
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);
    this.props.retrieveRecords(uid);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      records: nextProps.records.data
    })
  }

  handleRemoval(data,path) {
    let info = {id:data, path:path};
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    this.props.removeRecords(info, uid); 
    this.props.retrieveRecords(uid);
  }

  render () {
    const { records, height, fixedHeader, fixedFooter, selectable, multiSelectable, showCheckboxes, enableSelectAll,deselectOnClickaway, showRowHover, stripedRows, patient } = this.state;
    return (
        <div className="medRecords">
          {patient ? "" : <a href="/patient/records/upload" className="uploadRecord"><button>Upload</button></a>}
          {patient ? "" : <a href="/patient/records/appointments" className="uploadRecord"><button>Appointment Notes</button></a> }
        <Table
          height={height}
          fixedHeader={fixedHeader}
          fixedFooter={fixedFooter}
          selectable={selectable}
          multiSelectable={multiSelectable}
          style={styles.clearFix}
        >
          <TableHeader
            displaySelectAll={showCheckboxes}
            adjustForCheckbox={showCheckboxes}
            enableSelectAll={enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan={patient ? "4" : "5"} tooltip="Medical Records Data" style={{textAlign: 'center', fontSize:'24px'}}>
                Medical Records Data
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Date">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Type">Document Type</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Description">Document Description</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Record">Record Document</TableHeaderColumn>
              {patient ? '' : <TableHeaderColumn tooltip="The Record">Remove Document</TableHeaderColumn>}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={showCheckboxes}
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            stripedRows={stripedRows}
          >
            {records.map((record, index) => (
              <TableRow key={index} selected={record.selected}>
                <TableRowColumn>{record.date.slice(0,10)}</TableRowColumn>
                <TableRowColumn>{record.type}</TableRowColumn>
                <TableRowColumn>{record.description}</TableRowColumn>
                <TableRowColumn>
                  <a href={record.document_path} target="_blank">
                    {record.document_path.slice(-3) === 'pdf' ? <i className="fa fa-file-pdf-o fa-3x" aria-hidden="true"></i> : '' }
                    {record.document_path.slice(-3) === 'zip' ? <i className="fa fa-file-archive-o fa-3x" aria-hidden="true"></i> : '' }             
                    {['mp4','mp3', 'wav'].indexOf(record.document_path.slice(-3)) > -1 ? <i className="fa fa-file-audio-o fa-3x" aria-hidden="true"></i> : '' }
                    {['jpg','peg','png'].indexOf(record.document_path.slice(-3)) > -1 ? <i className="fa fa-file-image-o fa-3x" aria-hidden="true"></i> : '' }
                    {['doc','txt'].indexOf(record.document_path.slice(-3)) > -1 ? <i className="fa fa-file-text-o fa-3x" aria-hidden="true"></i> : '' }
                  </a>
                </TableRowColumn>
                {patient ? "" : <TableRowColumn><button onClick={this.handleRemoval.bind(this,record.id,record.document_path)}>Delete</button></TableRowColumn>}
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan={patient ? "4" : "5"} style={{textAlign: 'center'}}>
                End Records
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    records: state.records.records
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveRecords:(uid) => dispatch(getRecords(uid)),
    removeRecords:(data, uid) => dispatch(deleteRecords(data,uid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecordsDashboard);

