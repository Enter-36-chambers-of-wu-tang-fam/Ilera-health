// Dynamic dashboard render of patient's insurance info
//React / Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
// Actions
import { getUserInsurance } from '../../actions/user.js';
// Crypto
import CryptoJS from 'crypto-js';

class DashboardInsurance extends Component {

	constructor(props){
		super(props);
		this.state = {
			insurance: null
		}
	}

	componentWillMount(){
		const { dispatch, getUserInsurance } = this.props;
		let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key'); //need to change key
		const uid = code.toString(CryptoJS.enc.Utf8);
		getUserInsurance(uid);
	}

	componentWillReceiveProps(nextProps){
		this.setState({insurance: nextProps.insurance})
	}

	render(){
		const { insurance } = this.state;

		return (
			<div className="dashboardInsurance">
				<h3>Insurance</h3>
				<h5>Insurer</h5>
				<p>{ !insurance ? "No data available" : insurance.insurer1 ? insurance.insurer1 : insurance.insurer2 }</p>
				<h5>Network</h5>
				<p>{ !insurance ? "No data available" : insurance.insurance_network1 ? insurance.insurance_network1 : insurance.insurance_network2 }</p>
				<h5>Policy Number</h5>
				<p>{ !insurance ? "No data available" : insurance.policy_number1 ? insurance.policy_number1 : insurance.policy_number2 }</p>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserInsurance }, dispatch);
}

const mapStateToProps = (state) => {
  return {
		insurance: state.user.insurance[0]	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardInsurance);