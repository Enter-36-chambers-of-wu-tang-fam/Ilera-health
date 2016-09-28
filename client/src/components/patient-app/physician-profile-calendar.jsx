import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { connect } from 'react-redux';
import bindActionCreators from 'redux';

const style = {
  margin: 12,
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};


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

export default class PhysicianCalendar extends Component{
    
  constructor(props) {
    super(props);
    this.state = {
      appointmentDate: null,
      appointmentTime: false,
      autoOk: true,
      morning: {
        '8:00': true,
        // '8:15': true,
        '8:30': true,
        // '8:45': true,
        '9:00': true,
        // '9:15': true,
        '9:30': true,
        // '9:45': true,
        '10:00': true,
        // '10:15': true,
        '10:30': true,
        // '10:45': true,
        '11:00': true,
        // '11:15': true,
        '11:30': true,
        // '11:45': true
      },

      afternoon: {
        '12:00': true,
        // '12:15': true,
        '12:30': true,
        // '12:45': true,
        '1:00': true,
        // '1:15': true,
        '1:30': true,
        // '1:45': true,
        '2:00': true,
        // '2:15': true,
        '2:30': true,
        // '2:45': true,
        '3:00': true,
        // '3:15': true,
        '3:30': true,
        // '3:45': true,
        '4:00': true,
        // '4:15': true,
        '4:30': true,
        // '4:45': true
      },

      evening: {
        '5:00': true,
        // '5:15': true,
        '5:30': true,
        // '5:45': true,
        '6:00': true,
        // '6:15': true,
        '6:30': true,
        // '6:45': true,
        '7:00': true,
        // '7:15': true,
        '7:30': true,
        // '7:45': true
     }
    };
  }

  handleSubmit() {

  }

  handleDate(event, date){
    this.setState({
      appointmentDate: date
    })
    console.log(this.state.appointmentTime)
  }

  handleTime(time){
    this.setState({
      appointmentTime: time
    })
  }


  render(){
      return (
        <div className="scheduling">
          <DatePicker
            className="datePicker" 
            hintText="Select A Date" 
            container="inline" 
            mode="landscape" 
            autoOk={this.state.autoOk}
            value={this.state.appointmentDate}
            onChange={this.handleDate.bind(this)}
          />

          <p>Appointment Time: {this.state.appointmentTime}</p>
          <div className="times morning">
          <h3> Morning </h3>
            { Object.keys(this.state.morning).map(time => {
              return <RaisedButton key={time} label={time + " AM"} style={style} onClick={this.handleTime.bind(this,time)}/>   
            })}
          </div>

          <div className="times afternoon">
          <h3> Afternoon </h3>
            { Object.keys(this.state.afternoon).map(time => {
              return <RaisedButton key={time} label={time + " PM"} style={style} onClick={this.handleTime.bind(this,time)}/>   
            })}
          </div>

         <div className="times evening">
         <h3> Evening </h3>
            { Object.keys(this.state.evening).map(time => {
              return <RaisedButton key={time} label={time + " PM"} style={style} onClick={this.handleTime.bind(this,time)} />   
            })}
          </div>

          <RaisedButton label="Request Appointment" primary={true} style={style} disabled={this.state.appointmentDate && this.state.appointmentTime } onClick={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  bindActionCreators({setAppointment}, dispatch)
}

connect(mapStateToProps, mapDispatchToProps)(PhysicianCalendar);