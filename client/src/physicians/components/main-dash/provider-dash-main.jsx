import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardPatientProfile from './provider-dash-pat-profile.jsx';
import { getAllPhysicianApptsPatientsInfo } from '../../actions/appointment.js';
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
    console.error("this is uid",uid);
    this.props.loadAppointments(uid);
    // console.error('state.allPhysApptsPatInfo',state.allPhysApptsPatInfo);

  }

  componentWillReceiveProps(nextProps){
    console.error("nextProps",nextProps);
    this.setState({
      appointments: nextProps.appointments.info.data
    })
  }

  render() {
    console.error("Props", this.props.appointments)
    console.error('DashboardMain',this.state.appointments);

      if(this.state.appointments){
    return (
      <div className="dashboardMain">



         {this.state.appointments.map( pat =>
          <DashboardPatientProfile
            key={pat.id}
            first={pat.first}
            last={pat.last}
            photo={pat.photo_path}
            time={pat.time}
            />
        )}
    </div>

    );
  } else {
      return ("yolo");
    }
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAppointments: uid =>
      dispatch(getAllPhysicianApptsPatientsInfo(uid))
  }
}

export default connect(

  state => ({
    appointments: state.allPhysApptsPatInfo
  }),
    mapDispatchToProps,

)(DashboardMain);
// state.allPhysApptsPatInfo.patientInfo.info
// {this.props.appointments.map( pat =>
//   <DashboardPatientProfile
//     key={pat.id}
//     first={pat.first}
//     last={pat.last}
//     photo={pat.photo_path}
//     />
// )}

// const DashboardMain = () => {
//
//     return (
//         <div className="dashboardMain">
//             <h3>No clients scheduled...</h3>
//             <h2>Today's Appointments</h2>
//             <div>
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//                 <DashboardPatientProfile />
//             </div>
//         </div>
//     );
//
// };
// export default DashboardMain;


// <div className="dashboardMain">
//   <h3>No clients scheduled...</h3>
//   <h2>Today's Appointments</h2>
//   <div>
//     {this.props.appointments.map( pat =>
//       <DashboardPatientProfile
//         key={pat.id}
//         first={pat.first}
//         last={pat.last}
//         photo={pat.photo_path}
//         />
//     )}
// </div>
// </div>
