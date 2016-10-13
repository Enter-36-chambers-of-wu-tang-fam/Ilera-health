// Provider dashboard component rendering appointments
// React / Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import DashboardPatientProfile from '../../components/main-dash/provider-dash-pat-profile.jsx';
// Actions
import { getAllPhysicianApptsPatientsInfo } from '../../actions/appointment.js';
// Crypto
import CryptoJS from 'crypto-js';


class DashboardMain extends Component {
  constructor (props){
    super(props)
    this.state = {
      appointments:[]
    }
  }

  componentDidMount(){
    let id = localStorage.getItem('uid');
    let code  = CryptoJS.AES.decrypt(id.toString(), 'key');
    const uid = code.toString(CryptoJS.enc.Utf8);
    this.props.loadAppointments(uid);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      appointments: nextProps.appointments.info.data
    })
  }

  render() {
    if(this.state.appointments){
      return (
        <div className="dashboardMain">
          {this.state.appointments.map( pat =>
            <DashboardPatientProfile
              key={pat.id}
              first={pat.first}
              last={pat.last}
              photo={pat.photo_path}
              time={pat.time}/>
          )}
      </div>

    );
  } else {
      return (
        <div className="noAppts">
          <h3>No appointments today</h3>
        </div>
      );
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAppointments: uid =>
      dispatch(getAllPhysicianApptsPatientsInfo(uid))
  }
};

export default connect(
  state => ({
    appointments: state.allPhysApptsPatInfo
  }),
    mapDispatchToProps
)(DashboardMain);