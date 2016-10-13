`use strict`

import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {getAllPhysicianAppts, setAppointment} from '../../actions/appointment.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';

const style = {
  block: {
    maxWidth: 300,
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



//IF RADIO BUTTONS TURN OUT TO BE A BETTER DECISION...

// <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
//   { Object.keys(this.state.morning).map(time => {
//       return <RadioButton key={time} label={time + " AM"} style={style.radioButton} value={time} onClick={this.handleTime.bind(this,time)}/>
//     })}

//   { Object.keys(this.state.afternoon).map(time => {
//       return <RadioButton key={time} label={time + " AM"} style={style.radioButton} value={time} onClick={this.handleTime.bind(this,time)}/>
//     })}

//   { Object.keys(this.state.evening).map(time => {
//       return <RadioButton key={time} label={time + " AM"} style={style.radioButton} value={time} onClick={this.handleTime.bind(this,time)}/>
//     })}

// </RadioButtonGroup>

//<h1>HELLO FROM CALENDAR { this.props.params.provider }</h1>

class PhysicianCalendar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      physician: [],
      appointmentDate: null,
      appointmentTime: false,
      dateNotSelected: true,
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

    let data = {betterDocId: this.props.params.provider};
    let that = this;
    axios.post('/api/physician/checkbetterDoc', data)
      .then(physid => {
      that.setState({
        physician: physid.data[0]
      })
    this.props.getAppointments(physid.data[0].id);
    })
    .catch(err => console.log(err));

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      unavailableDates: nextProps.unavailableDates
    })
  }

  handleSubmit() {
    this.state.unavailableTimes[this.state.appointmentTime] = true;
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);

    let data = {
      id_patient: uid,
      id_physician: this.state.physician.id,
      date: this.state.appointmentDate,
      time: this.state.appointmentTime
    }
    this.props.requestAppointment(data);
    this.props.getAppointments(this.state.physician.id);
    this.setState({submittedAppointment:true})
  }

  handleDate(event, date){
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

 handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };


  handleTime(time){
    this.setState({
      appointmentTime: time + (this.state.morning[time] ? " AM" : " PM")
    })
  };

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
        const actions = [
          <FlatButton
            label="Dashboard"
            primary={true}
            href="/patient/dashboard"
            onTouchTap={this.handleClose.bind(this)}
          />,

          <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            href="#"
            onTouchTap={this.handleClose.bind(this)}
          />,
        ];

      return (
        <div className="scheduling">


          <RaisedButton
            className="appointmentRequestButton"
            label="Request An Appointment"
            primary={true}
            style={style}
            onTouchTap={this.handleOpen.bind(this)}
          />


          <Dialog
          title="Appointment Set"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          children={`Your appointment has been set for
            ${moment(this.state.appointmentDate).format("dddd, MMMM Do YYYY")}
            at ${String(this.state.appointmentTime)}
            ${this.state.morning[this.state.appointmentTime] ?
              ' AM' : ' PM'}!`}
          className="homeModal"
        >



          <DatePicker
            className="datePicker"
            hintText="Enter a date"
            container="inline"
            mode="landscape"
            open="open"
            autoOk={this.state.autoOk}
            value={this.state.appointmentDate}
            onChange={this.handleDate.bind(this)}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            defaultDate={this.state.minDate}
          />

          <p className="appointmentTime">Appointment Time:
            {this.state.appointmentTime ? this.state.appointmentTime + ' ' : ''}
            {this.state.morning[this.state.appointmentTime] ||
            this.state.afternoon[this.state.appointmentTime] ||
            this.state.evening[this.state.appointmentTime]}
          </p>
          <div className="timeOfDay">
          <h3> Morning </h3>
            <DropDownMenu
              maxHeight={300}
              value={this.state.morningTime}
              disabled={this.state.dateNotSelected}
              onChange={this.handleMorning.bind(this)}
            >
              { Object.keys(this.state.morning).map(time => {
              return <MenuItem
                key={time}
                value={time}
                primaryText={time + " AM"}
                disabled={this.state.unavailableTimes[time+':00'] ?
                  true : false }
                  style={style}
                  onClick={this.state.unavailableTimes[time+':00'] ?
                    '' : this.handleTime.bind(this,time)}
                />
            })}
            </DropDownMenu>
          <h3> Afternoon </h3>
            <DropDownMenu
              maxHeight={300}
              value={this.state.afternoonTime}
              disabled={this.state.dateNotSelected}
              onChange={this.handleAfternoon.bind(this)}
            >
              { Object.keys(this.state.afternoon).map(time => {
              return <MenuItem
                key={time}
                value={time}
                primaryText={time + " PM"}
                disabled={this.state.unavailableTimes[time+':00'] ? true : false }
                style={style}
                onClick={this.state.unavailableTimes[time+':00'] ? '' :
                  this.handleTime.bind(this,time)}
                />
            })}
            </DropDownMenu>
         <h3> Evening </h3>
            <DropDownMenu
              maxHeight={300}
              value={this.state.eveningTime}
              disabled={this.state.dateNotSelected}
              onChange={this.handleEvening.bind(this)}
            >
              { Object.keys(this.state.evening).map(time => {
              return <MenuItem
                key={time}
                value={time}
                primaryText={time + " PM"}
                disabled={this.state.unavailableTimes[time+':00'] ? true : false }
                style={style}
                onClick={this.state.unavailableTimes[time+':00'] ?
                  '' : this.handleTime.bind(this,time)}
                />
            })}
            </DropDownMenu>
        </div>

          <RaisedButton
            className="appointmentRequestButton"
            label="Submit Appointment Request"
            primary={true}
            style={submitStyle}
            disabled={!this.state.appointmentDate || !this.state.appointmentTime }
            onClick={this.handleSubmit.bind(this)}
          />

          {this.state.submittedAppointment ?
            <h4 className="appointmentSuccess">
              Your appointment has been set!
            </h4> : ''}


        </Dialog>
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
      requestAppointment: (data) =>{
        dispatch(setAppointment(data))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicianCalendar);
