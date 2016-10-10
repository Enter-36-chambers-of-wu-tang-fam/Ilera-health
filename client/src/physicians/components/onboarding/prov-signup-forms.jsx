// React
import React, { Component, PropTypes } from 'react';
import * as actions from '../../../auth-shared/actions/actions.js';
// ../../actions/actions.js
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CryptoJS from 'crypto-js';


// Components
import BetterUIDCheck from '.betterUID-form-check.jsx';
import NoBetterUIDIntro from './noBetterUID-form.jsx';

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


  render() {
	const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
	return (
        <div style={{width: '100%', maxWidth: 700, margin: '0 auto 30px'}}>
           <BetterUIDCheck />
           <NoBetterUIDIntro />
        </div>
		);
	}
};

export default PatientAppFormsContainer;
