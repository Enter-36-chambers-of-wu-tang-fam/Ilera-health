import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {getAllPhysicianAppts, updateAppointment} from '../../../actions/appointment.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';

const style = {
  block: {
    maxWidth: 300,
  },
  textArea: {
    width: "100%",
    minWidth: "100%",
    color: "#333"
  }
};

const submitStyle = {
  margin: "2% 0% 0% 5%"
};

//Set min and Max Dates

const minDate = new Date();
const maxDate = new Date();

minDate.setFullYear(minDate.getFullYear());
minDate.setDate(minDate.getDate()+1); //No same day appointment requests
minDate.setMonth(minDate.getMonth());
minDate.setHours(0, 0, 0, 0);

maxDate.setFullYear(maxDate.getFullYear()+1);
maxDate.setDate(maxDate.getDate());
maxDate.setMonth(maxDate.getMonth());
minDate.setHours(0, 0, 0, 0);


class PhysicianCalendar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      physId: null,
      patId: null,
      currentId: null,
      notes: null,
      appointment: [],
      appointmentDate: null,
      appointmentTime: false,
      submittedAppointment: false,

      unavailableDates: this.props.unavailableDates,
      unavailableTimes: {},

      minDate:minDate,
      maxDate:maxDate,

      autoOk: true, //Date Picker
      open: false, //Dialog

      morningTime: false,
      morning: {
        '08:00':true,
        '08:15':true,
        '08:30':true,
        '08:45':true,
        '09:00':true,
        '09:15':true,
        '09:30':true,
        '09:45':true,
        '10:00':true,
        '10:15':true,
        '10:30':true,
        '10:45':true,
        '11:00':true,
        '11:15':true,
        '11:30':true,
        '11:45':true
      },

      afternoonTime: false,
      afternoon: {
        '12:00':true,
        '12:15':true,
        '12:30':true,
        '12:45':true,
        '01:00':true,
        '01:15':true,
        '01:30':true,
        '01:45':true,
        '02:00':true,
        '02:15':true,
        '02:30':true,
        '02:45':true,
        '03:00':true,
        '03:15':true,
        '03:30':true,
        '03:45':true,
        '04:00':true,
        '04:15':true,
        '04:30':true,
        '04:45':true
      },

      eveningTime: false,
      evening: {
        '05:00':true,
        '05:15':true,
        '05:30':true,
        '05:45':true,
        '06:00':true,
        '06:15':true,
        '06:30':true,
        '06:45':true,
        '07:00':true,
        '07:15':true,
        '07:30':true,
        '07:45':true
      }
    };
  }
  componentWillMount() {
    console.error("THISPROPSSS!",this.props);
    this.props.getAppointments(Number(this.props.physId)); 
    this.setState({
      appointment: this.props.appointment,
      unavailableDates: this.props.unavailableDates,
      physId: this.props.physId,
      patId: this.props.patId,
      appointmentDate: this.props.currentDate,
      appointmentTime: this.props.currentTime,
      notes: this.props.currentNote,
      currentId: this.props.currentId
    });  
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      unavailableDates: nextProps.unavailableDates
    })
    console.error("NEXT PROPS!!!", nextProps);
  }

  handleSubmit() {
    let data = {
      id: this.state.currentId,
      id_patient: this.state.patId,
      id_physician: this.state.physId,
      notes: this.state.notes,
      date: this.state.appointmentDate,
      time: this.state.appointmentTime
    }
    this.props.submitAppointment(data);
    this.props.getAppointments(this.state.physId);
    this.setState({submittedAppointment:true})
  }

  handleDate(event, date){
    console.log("My DATE!!!!", date)
    this.setState({
      appointmentDate: date,
      unavailableTimes: {},
      dateNotSelected:false
    });
    let formattedDate = moment(date,'MM DD YYYY',true).format().slice(0,10);

    if(this.props.unavailableDates[formattedDate]){
      this.setState({
        unavailableTimes: this.props.unavailableDates[formattedDate]
      })
    }
  }


  handleTime(time){
    this.setState({
      appointmentTime: time + (this.state.morning[time] ? " AM" : " PM")
    })
  };

  handleNotes(event){
    this.setState({
      notes: event.target.value
    })
  }

  handleMorning(event,index,time) {
    this.setState({
      morningTime:time,
      afternoonTime:null,
      eveningTime: null
    });
  }

  handleAfternoon(event,index,time) {
    this.setState({
      morningTime:null,
      afternoonTime:time,
      eveningTime: null
    });
  }

  handleEvening(event,index,time) {
    this.setState({
      morningTime:null,
      afternoonTime:null,
      eveningTime: time
    });
  }


  render(){
      return (
        <div className="scheduling">

          <DatePicker
            className="datePicker"
            container="inline"
            mode="landscape"
            open="open"
            autoOk={this.state.autoOk}
            value={new Date(this.state.appointmentDate)}
            onChange={this.handleDate.bind(this)}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
          />

          <p className="appointmentTime">Appointment Time: {this.state.appointmentTime ? this.state.appointmentTime + ' ' : this.state.currentTime}
            {this.state.morning[this.state.appointmentTime] ||
            this.state.afternoon[this.state.appointmentTime] ||
            this.state.evening[this.state.appointmentTime]}
          </p>
          <div className="timeOfDay">
          <h2>Change Appointment Time</h2>
          <br />
          <h3> Morning </h3>
            <DropDownMenu maxHeight={300} value={this.state.morningTime}  onChange={this.handleMorning.bind(this)}>
              { Object.keys(this.state.morning).map(time => {
              return <MenuItem key={time} value={time} primaryText={time + " AM"} disabled={this.state.unavailableTimes[time+':00'] ? true : false } style={style} onClick={this.state.unavailableTimes[time+':00'] ? '' : this.handleTime.bind(this,time)}/>
            })}
            </DropDownMenu>
          <h3> Afternoon </h3>
            <DropDownMenu maxHeight={300} value={this.state.afternoonTime}  onChange={this.handleAfternoon.bind(this)}>
              { Object.keys(this.state.afternoon).map(time => {
              return <MenuItem key={time} value={time} primaryText={time + " PM"} disabled={this.state.unavailableTimes[time+':00'] ? true : false } style={style} onClick={this.state.unavailableTimes[time+':00'] ? '' : this.handleTime.bind(this,time)}/>
            })}
            </DropDownMenu>
         <h3> Evening </h3>
            <DropDownMenu maxHeight={300} value={this.state.eveningTime} onChange={this.handleEvening.bind(this)}>
              { Object.keys(this.state.evening).map(time => {
              return <MenuItem key={time} value={time} primaryText={time + " PM"} disabled={this.state.unavailableTimes[time+':00'] ? true : false } style={style} onClick={this.state.unavailableTimes[time+':00'] ? '' : this.handleTime.bind(this,time)}/>
            })}
            </DropDownMenu>
        </div>
				<h2>Appointment Notes</h2>
        <br />
          <TextField 
            name="note" 
            type="textarea" 
            multiLine={true}
            label="Appointment Notes" 
            value={this.state.notes} 
            onChange={this.handleNotes.bind(this)}
            style={style.textArea}
          />   
          <br />
          <RaisedButton className="appointmentRequestButton" label="Submit Appointment Details" primary={true} style={submitStyle} onClick={this.handleSubmit.bind(this)}/>

          {this.state.submittedAppointment ? <h4 className="appointmentSuccess">Your appointment has been set!</h4> : ''}

      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    unavailableDates: state.allPhysicianAppointments.setAppointments,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      getAppointments: (id) => {
        dispatch(getAllPhysicianAppts(id))
      },
      submitAppointment: (data) =>{
        dispatch(updateAppointment(data))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicianCalendar);