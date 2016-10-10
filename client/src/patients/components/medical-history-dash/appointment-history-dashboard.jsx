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



class AppointmentHistoryDashboard extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      appointments: [],
      open:false,
      currentNote: null,
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
    }
  }
	componentWillMount(){
      const { dispatch, getUserReminders } = this.props;
      let id = localStorage.getItem('uid');
      let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
      const uid = code.toString(CryptoJS.enc.Utf8);
      getUserReminders(uid);
	}

	componentWillReceiveProps(nextProps){
    console.log("REM", nextProps.reminders)
		this.setState({appointments: nextProps.reminders})
	}


  handleOpen(note) {
    this.setState({
      open: true,
      currentNote: note
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
    return (
        <div className="appointmentRecords">
          <a href="/patient/records" className="uploadRecord"><button>Medical Records</button></a>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          style={styles.clearFix}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
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
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.appointments.map((appointment, index) => (
              <TableRow key={index} selected={appointment.selected}>
                <TableRowColumn>{appointment.date === null ? 'no date' : appointment.date.slice(0,10)}</TableRowColumn>
                <TableRowColumn>{appointment.time[0] === '0' ? appointment.time.slice(1,5) : appointment.time.slice(0,5)} {appointment.time.slice(0,2) > 7 ? " AM" : " PM"} </TableRowColumn>
                <TableRowColumn>{appointment.first} {appointment.last}, {appointment.title}</TableRowColumn>
                <TableRowColumn><a href="#" onClick={this.handleOpen.bind(this, appointment.notes)}>{appointment.notes === null ? 'No Notes Yet': appointment.notes}</a></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                End Appointments
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>


        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          {this.state.currentNote === null ? 'No Notes Yet': this.state.currentNote}
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

