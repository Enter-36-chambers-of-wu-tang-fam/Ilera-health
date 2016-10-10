import React, { Component } from 'react';
// Components
import PatientProfileTabs from './prov-pat-profile-forms.jsx';
import ProfileDash from './prov-pat-profile-board.jsx';
import { connect } from 'react-redux';
import { getUserInfo, getUserInsurance } from '../../../patients/actions/user.js';
import { getAllPhysicianAppts } from '../../../physicians/actions/appointment.js';
<<<<<<< 6a3b36d54a1c9360d0b6bfa440f8d125f38b3cdd
import { getAllPatientMedication } from '../../../physicians/actions/medication.js';
=======
>>>>>>> Styling provider's patient view

class ProfileMain extends Component {

    constructor (props){
      super(props)
    }


    render() {
      const { user, appointments } = this.props;
      return (
          <div>
            <ProfileDash user={user} appointments={appointments}/>
            <PatientProfileTabs user={user}/>
          </div>
      );
    }
}

export default connect(
  state => ({
    user: state.user.user || {},
    appointments: state.allPhysicianAppointments,
    medications: state.meds.medication
  }),
  { 
	  load: getUserInfo,
    loadAppointments: getAllPhysicianAppts,
    loadMeds: getAllPatientMedication,
    appointments: state.allPhysicianAppointments
  }
)(ProfileMain);