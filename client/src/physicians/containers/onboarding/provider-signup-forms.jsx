// Parent container for forms provider goes through upon successful signup
// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { getDocInfo } from '../../actions/better-doc.js';
// Material UI
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// Other
import CryptoJS from 'crypto-js';
// Components
import BackgroundInfoForm from '../redux-forms/onboarding-basic-form.jsx';
import ProviderIntro from '../../components/onboarding/onboarding-intro.jsx';

class ProviderAppFormsContainer extends Component {
	static contextTypes = {
    router: React.PropTypes.object
  }

	constructor(props){
		super(props);
		this.state = {
			finished: false,
			stepIndex: 0,
			uid: null,
      doc: {}
		};
	}

  // if provider gave a better doc uid, grab the info from api
  componentWillMount(){
    const { getDocInfo } = this.props;
    var uid = localStorage.getItem('betterUID');
    if( uid !== undefined ){
      (getDocInfo(uid));
    }
  }

  // move stepper forward
  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  // move stepper back
  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    const { doc, user } = this.props;

    switch (stepIndex) {
      case 0:
        return <ProviderIntro
                  stepIndex={this.state.stepIndex}
                  getStepContent={this.getStepContent.bind(this)}
                  handleNext={this.handleNext.bind(this)}
                  handlePrev={this.handlePrev.bind(this)}/>
      case 1:
        return <BackgroundInfoForm
                  stepIndex={this.state.stepIndex}
                  getStepContent={this.getStepContent.bind(this)}
                  handleNext={this.handleNext.bind(this)}
                  handlePrev={this.handlePrev.bind(this)}
                  doc={doc} />;
      default:
        return <ProviderIntro />;
    }
  }

  render() {
		const {finished, stepIndex} = this.state;

		return (
      <div
				className="stepper"
				style={{width: '100%', maxWidth: 700, margin: '0 auto 30px'}}
			>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel><h6>Welcome</h6></StepLabel>
          </Step>
          <Step>
            <StepLabel><h6>Basic Info</h6></StepLabel>
          </Step>
        </Stepper>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
		);
	}
};

function mapStateToProps(state){
	return {
		doc: state.betterDoc.doc
	}
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDocInfo }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderAppFormsContainer);
