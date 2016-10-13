import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Route, Link, browserHistory } from 'react-router';
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

	handlePrev () {
		this.props.handlePrev();
	}

	handleNext (){
		this.props.handleNext();
	}

	handleSkip () {
		this.context.router.push('/staff/dashboard')
	}

	render () {
		return (
			<div className="formIntro">
				<h2>Welcome!</h2>
				<p>
					Thank you for signing up for Ilera Health. Let us begin!
				</p>
				<p>The next steps will walk you through forms to input some
					basic health info. Make this the
					<span className="bold">
						last time you have to fill out one of those pesky first appointment forms.
					</span>
				</p>
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
