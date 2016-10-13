import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { getUserInfo, getUserContacts, getUserInsurance, getUserRecords, getUserReminders, didInit } from '../../../patients/actions/user.js';
import { getRecords } from '../../../patients/actions/records.js';
// CryptoJS
import CryptoJS from 'crypto-js';
// Components
import BackgroundInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/basic-form-initialized.jsx';
import ContactInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/contact-form-initialized.jsx';
import HealthInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/health-form-initialized.jsx';
import ProviderInfoFormInitialized from '../../../patients/containers/redux-forms/profile-update/provider-form-initialized.jsx';
import PatientRecords from '../../../patients/components/medical-history-dash/medical-history-dashboard.jsx';
import PatientNotes from '../../../patients/components/medical-history-dash/appointment-history-dashboard.jsx';
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
      physId: null
    };
  }

	componentWillMount(){
	  const { dispatch, initialize, load, loadContacts, loadMeds, loadRecords, loadReminders, info, records, patId } = this.props;
    let id = localStorage.getItem('uid');
		let code  = CryptoJS.AES.decrypt(id.toString(), 'key');
		let uid = code.toString(CryptoJS.enc.Utf8);

    this.setState({physId: uid});
	  load(this.props.patId);
		loadContacts(this.props.patId);
		loadMeds(this.props.patId);
    loadRecords(this.props.patId);
    loadReminders(this.props.patId);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  render() {
		const { user, medications} = this.props;
    return (
			<div className="profileForms">
				<Tabs
					value={this.state.value}
				>
					<Tab
            onClick={this.handleChange.bind(this, 'a')}
            label="Basic User Info"
            style={styles.tab}
            value="a"
          >
						<div>
							<BackgroundInfoFormInitialized
                user={this.props.user}
                init={this.props.init}
                didInit={this.props.didInit}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'b')}
            label="Contact Info"
            style={styles.tab}
            value="b"
          >
						<div>
							<ContactInfoFormInitialized
                contacts={this.props.contacts}
                init={this.props.init}
                didInit={this.props.didInit}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'c')}
            label="Health Info"
            style={styles.tab}
            value="c"
          >
						<div>
							<HealthInfoFormInitialized
                health={this.props.user}
                init={this.props.init}
                didInit={this.props.didInit}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'd')}
            label="Provider Info"
            style={styles.tab}
            value="d"
          >
						<div>
							<ProviderInfoFormInitialized
                provider={this.props.provider}
                init={this.props.init}
                didInit={this.props.didInit}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'e')}
            label="Records"
            style={styles.tab}
            value="e"
            >
						<div>
							<PatientRecords
                records={this.props.records}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'f')}
            label="Notes"
            style={styles.tab}
            value="f"
          >
						<div>
							<PatientNotes
                reminders={this.props.reminders}
                patId={this.props.user.id}
                physId={this.state.physId}
              />
						</div>
					</Tab>
					<Tab
            onClick={this.handleChange.bind(this, 'g')}
            label="Meds"
            style={styles.tab}
            value="g"
          >
						<div>
							<ProfileMeds
                user={user}
                patId={this.props.user.id}
                medications={medications}
              />
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
		medications: state.meds.medication,
    records: state.records.records,
    reminders: state.user.reminders
  }),
  {
	  load: getUserInfo,
		loadContacts: getUserContacts,
		loadMeds: getAllPatientMedication,
    loadRecords: getRecords,
    loadReminders: getUserReminders,
	  didInit: didInit
  }
)(PatientProfileTabs)
