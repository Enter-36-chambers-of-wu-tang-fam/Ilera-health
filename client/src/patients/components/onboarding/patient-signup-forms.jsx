// Parent component of the forms user fills out upon sign up
// React
import React, { Component, PropTypes } from 'react';
// Actions
import * as actions from '../../../auth-shared/actions/actions.js';
// Material UI
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// Crypto
import CryptoJS from 'crypto-js';
// Components
import BackgroundInfoForm from '../../containers/redux-forms/onboarding/basic-info-form.jsx';
import ContactInfoForm from '../../containers/redux-forms/onboarding/contact-info-form.jsx';
import InsuranceForm from '../../containers/redux-forms/onboarding/provider-form.jsx';
import FormIntro from './form-intro.jsx';
import HealthInfo from '../../containers/redux-forms/onboarding/health-info-form.jsx';

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
        return <FormIntro 
                  stepIndex={this.state.stepIndex} 
                  getStepContent={this.getStepContent.bind(this)} 
                  handleNext={this.handleNext.bind(this)} 
                  handlePrev={this.handlePrev.bind(this)}/>
      case 1:
        return <BackgroundInfoForm 
                  stepIndex={this.state.stepIndex} 
                  getStepContent={this.getStepContent.bind(this)} 
                  handleNext={this.handleNext.bind(this)} 
                  handlePrev={this.handlePrev.bind(this)}/>;
      case 2:
        return <ContactInfoForm 
                  stepIndex={this.state.stepIndex} 
                  getStepContent={this.getStepContent.bind(this)} 
                  handleNext={this.handleNext.bind(this)} 
                  handlePrev={this.handlePrev.bind(this)}/>;
      case 3:
        return <HealthInfo 
                  stepIndex={this.state.stepIndex} 
                  getStepContent={this.getStepContent.bind(this)} 
                  handleNext={this.handleNext.bind(this)} 
                  handlePrev={this.handlePrev.bind(this)}/>;
      case 4:
        return <InsuranceForm 
                  stepIndex={this.state.stepIndex} 
                  getStepContent={this.getStepContent.bind(this)} 
                  handleNext={this.handleNext.bind(this)} 
                  handlePrev={this.handlePrev.bind(this)}/>;
      default:
        return <FormIntro />;
    }
  }

  render() {
		const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
		return (
				<div className="stepper" style={{width: '100%', maxWidth: 700, margin: '0 auto 30px'}}>
					<Stepper activeStep={stepIndex}>
            <Step>
							<StepLabel><h6>Welcome</h6></StepLabel>
						</Step>
						<Step>
							<StepLabel><h6>Basic Info</h6></StepLabel>
						</Step>
						<Step>
							<StepLabel><h6>Contact Info</h6></StepLabel>
						</Step>
            <Step>
							<StepLabel><h6>Health Info</h6></StepLabel>
						</Step>
						<Step>
							<StepLabel><h6>Provider Info</h6></StepLabel>
						</Step>
					</Stepper>
					<div>{this.getStepContent(stepIndex)}</div>
				</div>
		);
	}
};

export default PatientAppFormsContainer;