import React, { Component } from 'react';




const DashboardPatientProfile = ({photo, first, last, time}) => {

    return (
      <div className="dashboardTodayApts">
          <img
            src={`${photo}`}
            alt=""
            />

          <div>
              <h4>{time}</h4>
              <div>
                  <h3>{first} {last}</h3>
                  <p>Lorem ipsum dipsum some short description of
                    why the patient is coming in or any notes the doctor
                    should know before the appointment.</p>
              </div>
          </div>
      </div>
    );

};


export default DashboardPatientProfile;


// <div className="dashboardTodayApts">
//     <img
//       src={`${patient.photo_path}`}
//       alt=""
//       />
//
//     <div>
//         <h4>2:40 PM</h4>
//         <div>
//             <h3>{patient.first} {patient.last}</h3>
//             <p>Lorem ipsum dipsum some short description of
//               why the patient is coming in or any notes the doctor
//               should know before the appointment.</p>
//         </div>
//     </div>
// </div>
