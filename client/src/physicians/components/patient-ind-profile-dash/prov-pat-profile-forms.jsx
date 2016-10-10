import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { getUserInfo, getUserContacts, getUserInsurance, didInit } from '../../../patients/actions/user.js';
// CryptoJS
import CryptoJS from 'crypto-js';
// Components
import BackgroundInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/basic-form-initialized.js';
import ContactInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/contact-form-initialized.js';
import HealthInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/health-form-initialized.js';
import ProviderInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/provider-form-initialized.js';
import ProfileMeds from './prov-pat-profile-meds.jsx';
import { getAllPatientMedication } from '../../../physicians/actions/medication.js';


const styles = {
  tab: {
    backgroundColor: '#0D2233'
  },
};

class PatientProfileTabs extends Component {

    constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

	componentWillMount(){
	  const { dispatch, initialize, load, loadContacts, loadMeds, info } = this.props;
	  load(21);
		loadContacts(21);
		loadMeds(21);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  render() {
		const { user, medications } = this.props;
    return (
			<div className="profileForms">
				<Tabs
					value={this.state.value}

				>
					<Tab onClick={this.handleChange.bind(this, 'a')} label="Basic User Info" style={styles.tab} value="a" >
						<div>
							<BackgroundInfoFormInitialized user={this.props.user} init={this.props.init} didInit={this.props.didInit}/>
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'b')} label="Contact Info" style={styles.tab} value="b" >
						<div>
							<ContactInfoFormInitialized contacts={this.props.contacts} init={this.props.init} didInit={this.props.didInit}/>
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'c')} label="Health Info" style={styles.tab} value="c" >
						<div>
							<HealthInfoFormInitialized health={this.props.user} init={this.props.init} didInit={this.props.didInit}/>
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'd')} label="Provider Info" style={styles.tab} value="d">
						<div>
							<ProviderInfoFormInitialized provider={this.props.provider} init={this.props.init} didInit={this.props.didInit} />
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'e')} label="Records" style={styles.tab} value="e">
						<div>
							<h2></h2>
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'f')} label="Notes" style={styles.tab} value="f">
						<div>
							<h2></h2>
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'g')} label="Meds" style={styles.tab} value="g">
						<div>
							<ProfileMeds user={user} medications={medications}/>
						</div>
					</Tab>
				</Tabs>
			</div>
    );
  }
};

export default connect(
  state => ({
    user: state.user.user || {},
		init: state.user.init,
		contacts: state.user.e_contacts[0] || state.user.e_contacts,
		provider: state.user.provider[0] || state.user.provider,
		medications: state.meds.medication
  }),
  { 
	  load: getUserInfo,
		loadContacts: getUserContacts,
		loadMeds: getAllPatientMedication,
	  didInit: didInit
  }
)(PatientProfileTabs)
