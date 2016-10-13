import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { getAllPhysicianAppts } from '../../actions/appointment.js';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';

class DashboardReminders extends Component {

	constructor(props){
		super(props);
		this.state = {
			reminders: null
		}
	}

	componentWillMount(){
      const { dispatch, getAllPhysicianAppts } = this.props;
      let id = localStorage.getItem('uid');
      let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
      const uid = code.toString(CryptoJS.enc.Utf8);
      getAllPhysicianAppts(uid);
	}

	componentWillReceiveProps(nextProps){
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
    const uid = code.toString(CryptoJS.enc.Utf8);
		this.setState({reminders: nextProps.reminders.filter(item => {
        return Number(item.id_physician) === Number(uid); //Only get current physicians appointments
      })
    })
	}

	render(){
		const { reminders } = this.state;
    console.log("REMINDA", this.state.reminders);
			return (
				<div>
          <h3>Reminders</h3>
          <div id="dashReminders">
            <ul className='dashRemindersList clearfix'>
                { !reminders ? "No reminders" : reminders.map(reminder => {
                    var date = new Date(reminder.date);
                    var months = ["Jan", "Feb", "Mar", "Apr",
											"May", "Jun", "Jul", "Aug", "Sept",
											"Oct", "Nov", "Dec"];
                    var month = date.getMonth();
                    month = months[month];
                    var day = date.getDate();
                    var time = reminder.time.slice(0,6);
                    return (
                      <li className="reminders" key={reminder.id}>
                        <div>
                          <p>{month}</p>
                          <p>{day}</p>
                        </div>
                        <div>
                          <p>
														{time[0] === '0' ? time.slice(1,5) : time}
														{time.slice(0,2) > 7 ? " AM" : " PM"}
													</p>
                          <h6>
														{reminder.first}
														{reminder.last}
														{reminder.title !== null ? ","+reminder.title : ''}
													</h6>
                        </div>
                      </li>
                    )
                })}
            </ul>
          </div>
        </div>
			);
	}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllPhysicianAppts }, dispatch);
}

const mapStateToProps = (state) => {
  return {
		reminders: state.user.reminders
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardReminders);
