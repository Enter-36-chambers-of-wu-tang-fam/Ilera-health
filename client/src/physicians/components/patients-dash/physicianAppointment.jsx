`use strict`

import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import {getAllPhysicianAppts, setAppointment} from '../../actions/appointment.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';

const style = {
  margin: 12,
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
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

      unavailableDates: this.props.unavailableDates,
      unavailableTimes: {},

      minDate:minDate,
      maxDate:maxDate,

      autoOk: true, //Date Picker
      open: false, //Dialog

      morning: {
        '08:00':true,
        '8:15':true,
        '08:30':true,
        '8:45':true,
        '09:00':true,
        '9:15':true,
        '09:30':true,
        '9:45':true,
        '10:00':true,
        '10:15':true,
        '10:30':true,
        '10:45':true,
        '11:00':true,
        '11:15':true,
        '11:30':true,
        '11:45':true
      },

      afternoon: {
        '12:00':true,
        '12:15':true,
        '12:30':true,
        '12:45':true,
        '01:00':true,
        '1:15':true,
        '01:30':true,
        '1:45':true,
        '02:00':true,
        '2:15':true,
        '02:30':true,
        '2:45':true,
        '03:00':true,
        '3:15':true,
        '03:30':true,
        '3:45':true,
        '04:00':true,
        '4:15':true,
        '04:30':true,
        '4:45':true
      },

      evening: {
        '05:00':true,
        '5:15':true,
        '05:30':true,
        '5:45':true,
        '06:00':true,
        '6:15':true,
        '06:30':true,
        '6:45':true,
        '07:00':true,
        '7:15':true,
        '07:30':true,
        '7:45':true
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
  }

  handleDate(event, date){
    this.setState({
      appointmentDate: date,
      unavailableTimes: {}
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
      appointmentTime: time,
    })
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
          <DatePicker
            className="datePicker"
            hintText="Enter a date"
            container="inline"
            mode="landscape"
            autoOk={this.state.autoOk}
            value={this.state.appointmentDate}
            onChange={this.handleDate.bind(this)}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            defaultDate={this.state.minDate}
          />

          <p className="appointmentTime">Appointment Time: {this.state.appointmentTime ? this.state.appointmentTime + ' ' : ''}
            {this.state.morning[this.state.appointmentTime] ||
            this.state.afternoon[this.state.appointmentTime] ||
            this.state.evening[this.state.appointmentTime]}
          </p>
          <div className="times morning">
          <h3> Morning </h3>
            { Object.keys(this.state.morning).map(time => {
              return <RaisedButton key={time} label={time + " AM"} disabled={this.state.unavailableTimes[time+':00'] ? true : false } style={style} onClick={this.handleTime.bind(this,time)}/>
            })}
          </div>

          <div className="times afternoon">
          <h3> Afternoon </h3>
            { Object.keys(this.state.afternoon).map(time => {
              return <RaisedButton key={time} label={time + " PM"} style={style} disabled={this.state.unavailableTimes[time+':00'] ? true : false} onClick={this.handleTime.bind(this,time)}/>
            })}
          </div>

         <div className="times evening">
         <h3> Evening </h3>
            { Object.keys(this.state.evening).map(time => {
              return <RaisedButton key={time} label={time + " PM"} style={style} disabled={this.state.unavailableTimes[time+':00'] ? true : false} onClick={ this.handleTime.bind(this,time) } />
            })}
          </div>

          <RaisedButton className="appointmentRequestButton" label="Request Appointment" primary={true} style={style} onTouchTap={this.handleOpen.bind(this)} disabled={!this.state.appointmentDate || !this.state.appointmentTime } onClick={this.handleSubmit.bind(this)}/>


          <Dialog
          title="Appointment Set"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          children={`Your appointment has been set for ${moment(this.state.appointmentDate).format("dddd, MMMM Do YYYY")} at ${String(this.state.appointmentTime)} ${this.state.morning[this.state.appointmentTime] ? ' AM' : ' PM'}!`}
        >
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