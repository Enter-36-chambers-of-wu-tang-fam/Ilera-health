// React
import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/actions.js';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';


// Components
import BackgroundForm from '../../containers/forms/demographic-form.js';
import EmergencyContactForm from '../../containers/forms/emergency-contact-form.js';
import InsuranceForm from '../../containers/forms/insurance-policy-form.js';
import FormIntro from '../../containers/forms/form-intro.js';

class PatientAppFormsContainer extends Component {
	static contextTypes = {
        router: React.PropTypes.object
    }

	constructor(props){
		super(props);
		this.state = {
			finished: false,
			stepIndex: 0,
			uid: null
		};
	}
	

  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormIntro stepIndex={this.state.stepIndex} getStepContent={this.getStepContent.bind(this)} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>
      case 1:
        return <BackgroundForm stepIndex={this.state.stepIndex} getStepContent={this.getStepContent.bind(this)} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>;
      case 2:
        return <EmergencyContactForm stepIndex={this.state.stepIndex} getStepContent={this.getStepContent.bind(this)} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>;
      case 3:
        return <InsuranceForm stepIndex={this.state.stepIndex} getStepContent={this.getStepContent.bind(this)} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>;
      default:
        return <FormIntro />;
    }
  }

  render() {
		const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
		return (
				<div style={{width: '100%', maxWidth: 700, margin: '0 auto 30px'}}>
					<Stepper activeStep={stepIndex}>
            <Step>
							<StepLabel>Welcome</StepLabel>
						</Step>
						<Step>
							<StepLabel>Basic Info</StepLabel>
						</Step>
						<Step>
							<StepLabel>Contact Info</StepLabel>
						</Step>
						<Step>
							<StepLabel>Insurance Info</StepLabel>
						</Step>
					</Stepper>
					<div>{this.getStepContent(stepIndex)}</div>
				</div>
		); 
	}
};

export default PatientAppFormsContainer;