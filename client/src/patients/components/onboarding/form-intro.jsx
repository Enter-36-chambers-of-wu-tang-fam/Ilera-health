// Form introduction seen upon successful patient sign up
// React / Redux
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
// Materia UI
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class FormIntro extends Component {

	static contextTypes = {
		router: React.PropTypes.object
	}

	// update stepper
	// see patient-signup-forms.jsx
	getStepContent (){
		let steps=this.props.stepIndex;
		this.props.getStepContent(steps);
	}

	// update stepper
	// see patient-signup-forms.jsx
	handlePrev () {
		this.props.handlePrev();
	}

	// update stepper
	// see patient-signup-forms.jsx
	handleNext (){
		this.props.handleNext();
	}

	// update stepper
	// see patient-signup-forms.jsx
	handleSkip () {
		this.context.router.push('/patient/dashboard')
	}

	render () {
		return (
			<div className="formIntro">
				<h2>Welcome!</h2>
				<p>Thank you for signing up for Ilera Health. Let's begin!</p> 
				<p>The next steps will walk you through forms to input some basic health info. Make this the <span className="bold">last time you have to fill out one of those pesky first appointment forms.</span></p>
				<h4>Not ready to fill out this info?</h4>
				<p> No worries! Feel free to skip ahead to the dashboard.</p>
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
					label={'Dashboard'}
					onTouchTap={this.handleSkip.bind(this)}
					style={{
						margin: '0 25%'
					}}
				/>
				<RaisedButton
					label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
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