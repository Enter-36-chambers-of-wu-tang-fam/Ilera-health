import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserReminders } from '../../actions/user.js';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PatientNotes from '../../../patients/containers/redux-forms/appointmentNotes/appointment-form.jsx';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  clearFix: {
    clear: "both"
  },
  modalStyle: {
    width: '80%',
    minWidth:'80%'
  },
  textArea: {
    width: "100%",
    minWidth: "100%",
    color: "#333"
  }
};



class AppointmentHistoryDashboard extends Component{
  
  constructor(props){
    super(props);
    const status = (localStorage.getItem('userType')) === 'patient' ? false : true;
    this.state = {
      appointments: [],
      physId: 0,
      patId: 0,
      open:false,
      currentNote: null,
      currentDate: null,
      currentTime: null,
      currentName: null,
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
      const { dispatch, getUserReminders } = this.props;
      let id = localStorage.getItem('uid');
      let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
      const uid = code.toString(CryptoJS.enc.Utf8);
      console.error("WILL MOUNT PROPS", this.props)
      getUserReminders(uid);
	}

	componentWillReceiveProps(nextProps){
    console.error("RECEIVEPROPS", nextProps);
		this.setState({
      appointments: nextProps.reminders,
      physId: nextProps.physId,
      patId: nextProps.patId
    })
	}


  handleOpen(id,note,name,date,time) {
    this.setState({
      open: true,
      currentId: id,
      currentNote: note,
      currentDate: date,
      currentTime: time,
      currentName: name
      });
  };

  handleClose() {
    this.setState({open: false});
  };

  render () {
     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    const { appointments, open, currentNote, currentDate, currentTime, height, fixedHeader, fixedFooter, selectable, multiSelectable, showCheckboxes, enableSelectAll,deselectOnClickaway, showRowHover, stripedRows, patient } = this.state;
    return (
        <div className="appointmentRecords">
          {patient ? "" : <a href="/patient/records" className="uploadRecord"><button>Medical Records</button></a>}
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
              <TableHeaderColumn colSpan="4" tooltip="Appointment Information" style={{textAlign: 'center', fontSize:'24px'}}>
                Appointment History Data
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="Time">Time</TableHeaderColumn>
              <TableHeaderColumn tooltip="Physician">Physician</TableHeaderColumn>
              <TableHeaderColumn tooltip="Notes">Notes</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={showCheckboxes}
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            stripedRows={stripedRows}
          >
            {appointments.map((appointment, index) => (
              <TableRow key={index} selected={appointment.selected}>
                <TableRowColumn>{appointment.date === null ? 'no date' : appointment.date.slice(0,10)}</TableRowColumn>
                <TableRowColumn>{appointment.time[0] === '0' ? appointment.time.slice(1,5) : appointment.time.slice(0,5)} {appointment.time.slice(0,2) > 7 ? " AM" : " PM"} </TableRowColumn>
                <TableRowColumn>{appointment.first} {appointment.last}, {appointment.title}</TableRowColumn>
                <TableRowColumn>
                  {appointment.notes === null ? 'No Notes Yet': <a href="#" onClick={this.handleOpen.bind(this, appointment.id, appointment.notes, appointment.first+' '+appointment.last, appointment.date.slice(0,10), 
                  appointment.time[0] === '0' ? appointment.time.slice(1,5) : appointment.time.slice(0,5))}>View</a>}
                  {appointment.notes === null && patient ? <a href="#" onClick={this.handleOpen.bind(this, appointment.id, appointment.notes, appointment.first+' '+appointment.last, appointment.date.slice(0,10), 
                  appointment.time[0] === '0' ? appointment.time.slice(1,5) : appointment.time.slice(0,5))}>Begin Note</a> : ''}
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                End Appointments
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>


        <Dialog
          title="Appointment Notes"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          contentStyle={styles.modalStyle}
        >
          {patient ? <PatientNotes physId={this.state.physId} patId={this.state.patId} currentId={this.state.currentId} currentTime={this.state.currentTime} currentDate={this.state.currentDate} currentNote={this.state.currentNote} /> : 
          <div> 
            <br /> 
            {"Provider: " + this.state.currentName}
            <br />
            <br />
            <h2>Appointment Details</h2>
            <br />
            {"Date: " + this.state.currentDate} 
            <br /> 
            <br /> 
            {"Time: " + this.state.currentTime} 
            <br /> 
            <br /> 
            <TextField 
              name="note" 
              type="textarea" 
              multiLine={true} 
              label="Appointment Notes" 
              disabled={true}
              defaultValue={this.state.currentNote === null ? 'No Notes Yet' : "Provider's Notes: " + this.state.currentNote}
              style={styles.textArea}
            />   
          </div> } 
        </Dialog>
        </div>
    );
  }
};



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserReminders }, dispatch);
}

const mapStateToProps = (state) => {
  return {
		reminders: state.user.reminders	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentHistoryDashboard);

