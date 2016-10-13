// Introduction window shown upon successful provider sign up
// React/Redux
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class FormIntro extends Component {

	static contextTypes = {
		router: React.PropTypes.object
	}

	getStepContent (){
		let steps=this.props.stepIndex;
		this.props.getStepContent(steps);
	}

  // move stepper forward
	handlePrev () {
		this.props.handlePrev();
	}

  // move stepper forward
	handleNext (){
		this.props.handleNext();
	}

	render () {
		return (
			<div className="formIntro">
				<h2>Welcome!</h2>
				<p>Thank you for signing up for Ilera Health. Let's begin!</p> 
				<p>If you entered a Better Doctor UID, you will be prompted to confirm your information on the next screen. If any of the information is innacurate or out of date, please <a href='http://betterdoctor.com/doctors'>update your information</a>. </p>
				<p>If you did not enter a Better Doctor UID upon sign up, the next screen will prompt you to add some basic information. We suggest you <a href="http://betterdoctor.com/doctors">register</a> with Better Doctor in order to help us verify your practice.</p>
				<div>{this.getStepContent()}</div>
				<div style={{marginTop: 40}}>
					<FlatButton
						label="Back"
						disabled={this.props.stepIndex === 0}
						onTouchTap={this.handlePrev.bind(this)}
						style={{marginRight: 12}}
						className='btn btn-back'
					/>
					<RaisedButton
						label={this.props.stepIndex === 1 ? 'Finish' : 'Next'}
						primary={true}
						onTouchTap={this.handleNext.bind(this)}
						className='btn btn-back'
						style={{
							float: 'right'
						}}
					/>
				</div>
			</div>
		)
	}
};

export default FormIntro;