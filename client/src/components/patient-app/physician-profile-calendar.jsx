import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {getCurrentBookings, setAppointment} from './../../actions/appointment.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';

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
minDate.setDate(minDate.getDate());
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
      appointmentDate: null,
      appointmentTime: false,

      unavailableDates: this.props.unavailableDates,
      unavailableTimes: {},

      minDate:minDate,
      maxDate:maxDate,

      autoOk: true,

      morning: {
        '08:00': 'AM',
        // '8:15': 'AM',
        '08:30': 'AM',
        // '8:45': 'AM',
        '09:00': 'AM',
        // '9:15': 'AM',
        '09:30': 'AM',
        // '9:45': 'AM',
        '10:00': 'AM',
        // '10:15': 'AM',
        '10:30': 'AM',
        // '10:45': 'AM',
        '11:00': 'AM',
        // '11:15': 'AM',
        '11:30': 'AM',
        // '11:45': 'AM'
      },

      afternoon: {
        '12:00': 'PM',
        // '12:15': 'PM',
        '12:30': 'PM',
        // '12:45': 'PM',
        '01:00': 'PM',
        // '1:15': 'PM',
        '01:30': 'PM',
        // '1:45': 'PM',
        '02:00': 'PM',
        // '2:15': 'PM',
        '02:30': 'PM',
        // '2:45': 'PM',
        '03:00': 'PM',
        // '3:15': 'PM',
        '03:30': 'PM',
        // '3:45': 'PM',
        '04:00': 'PM',
        // '4:15': 'PM',
        '04:30': 'PM',
        // '4:45': 'PM'
      },

      evening: {
        '05:00': 'PM',
        // '5:15': 'PM',
        '05:30': 'PM',
        // '5:45': 'PM',
        '06:00': 'PM',
        // '6:15': 'PM',
        '06:30': 'PM',
        // '6:45': 'PM',
        '07:00': 'PM',
        // '7:15': 'PM',
        '07:30': 'PM',
        // '7:45': 'PM'
      }
    };
  }

  componentWillMount() {
    
    //Get physician information from local storage to decrypt

    let id = this.props.params.provider; //Get encoded provider key from url
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let physid = code.toString(CryptoJS.enc.Utf8); //Get decoded physician id --> This should most likely be taking place on the backend
    
    physid = 1; /********CHANGE ONCE WE HAVE THE PHYSICIAN VIEWS GOING**********/
    this.props.getAppointments(physid);
  }

  handleSubmit() {
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    let uid = code.toString(CryptoJS.enc.Utf8);


    let data = {
      id_patient: uid,
      id_physician: 1 || this.state.physId,
      date: this.state.appointmentDate,
      time: this.state.appointmentTime
    }
    setAppointment(data);
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
    {console.log(this.props.unavailableTimes)}
    }  
  }

  handleTime(time){
    this.setState({
      appointmentTime: time
    })
  }



  render(){
    {console.log(this.props)}
      return (
        <div className="scheduling">
          <DatePicker
            className="datePicker" 
            hintText="Select a date here" 
            container="inline" 
            mode="landscape" 
            autoOk={this.state.autoOk}
            value={this.state.appointmentDate}
            onChange={this.handleDate.bind(this)}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            defaultDate={this.state.minDate}
          />

          <p>Appointment Time: {this.state.appointmentTime ? this.state.appointmentTime + ' ' : ''}
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

          <RaisedButton label="Request Appointment" primary={true} style={style} disabled={!this.state.appointmentDate || !this.state.appointmentTime } onClick={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     currentPhysicianBookings: state.currentPhysicianBookings
//   }
// }
function mapStateToProps (state) {
  return {
    unavailableDates: state.allPhysicianAppointments.setAppointments,
  }
}
const mapDispatchToProps = (dispatch) => {
  return { 
      getAppointments: (id) => {
        dispatch(getCurrentBookings(id))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicianCalendar);