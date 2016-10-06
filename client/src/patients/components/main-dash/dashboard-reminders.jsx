import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { getUserInsurance, getUserReminders } from '../../actions/user.js';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';

class DashboardReminders extends Component {

	constructor(props){
		super(props);
		console.log("RENUBDER ORIOS", props)
		this.state = {
			reminders: null
		}
	}

	componentWillMount(){
      const { dispatch, getUserReminders } = this.props;
      let id = localStorage.getItem('uid');
      let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
      const uid = code.toString(CryptoJS.enc.Utf8);
			console.log("YOU HERE?")
      getUserReminders(uid);
	}

	componentWillReceiveProps(nextProps){
		this.setState({reminders: nextProps.reminders})
	}

	render(){
		const { reminders } = this.state;
			return (
					 <div>
                <h3>Reminders</h3>
                <div id="dashReminders">
                    <ul className='dashRemindersList clearfix'>
										{ !reminders ? "No reminders" : reminders.map(reminder => {
											var date = new Date(reminder.date);
											var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
											var month = date.getMonth();
											month = months[month];
											var day = date.getDate();
											if(reminder.time[3] === "0"){
												var time = reminder.time.slice(4);
											}else{
												var time = reminder.time.slice(2);
											}
											
											return (
												<li className="reminders" key={reminder.id}>
													<div>
														<p>{month}</p>
														<p>{day}</p>
													</div>
													<div>
														<p>{time}</p>
														<h6>Dr. Yang - Yearly checkup.</h6>
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
  return bindActionCreators({ getUserReminders }, dispatch);
}

const mapStateToProps = (state) => {
  return {
		reminders: state.user.reminders	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardReminders);
