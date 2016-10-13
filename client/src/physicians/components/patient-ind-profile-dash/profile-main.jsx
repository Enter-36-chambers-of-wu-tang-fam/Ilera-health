import React, { Component } from 'react';
// Components
import PatientProfileTabs from './prov-pat-profile-forms.jsx';
import ProfileDash from './prov-pat-profile-board.jsx';
import { connect } from 'react-redux';
import { getUserInfo, getUserInsurance, getUserReminders } from '../../../patients/actions/user.js';
import { getAllPhysicianAppts } from '../../../physicians/actions/appointment.js';
import { getAllPatientMedication } from '../../../physicians/actions/medication.js';
import { getRecords } from '../../../patients/actions/records.js';

class ProfileMain extends Component {

    constructor (props){
      super(props)
    }

    componentWillMount(){
      this.props.load(this.props.params.patientId);
      this.props.loadRecords(this.props.params.patientId);
      this.props.loadReminders(this.props.params.patientId);
    }

    componentWillReceiveProps(nextProps) {
      console.log("NEXT PROPS", nextProps)
    }


    render() {
      const { user, appointments, records } = this.props;
      return (
          <div>
            <ProfileDash
              user={user}
              appointments={appointments}
            />
            <PatientProfileTabs
              user={user}
              patId={this.props.params.patientId}
            />
          </div>
      );
    }
}

export default connect(
  state => ({
    user: state.user.user || {},
    appointments: state.allPhysicianAppointments,
    medications: state.meds.medication,
    records: state.records,
    reminders: state.user.reminders
  }),
  {
	  load: getUserInfo,
    loadAppointments: getAllPhysicianAppts,
    loadMeds: getAllPatientMedication,
    loadRecords: getRecords,
    loadReminders: getUserReminders,
    appointments: getAllPhysicianAppts
  }
)(ProfileMain);
