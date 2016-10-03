// import React, { Component } from 'react';
// componentDidMount() {
//     if(navigator.geolocation){
//       console.log("There IS GEO LOCATION");
//       let query = `https://api.betterdoctor.com/2016-03-01/doctors?location=${this.state.lat}%2C${this.state.lon}%2C100&user_location=${this.state.lat}%2C${this.state.lon}&skip=0&limit=10&user_key=bdd1495417e49ba2f1aa40461ce8f17d`;
//         axios.get(query)
//         .then(result => {
//           console.log("THERE IS A RESULT", result);
//           let docs = [];
//           result.data.data.map( doctor => {

//             docs.push({first_name: doctor.profile.first_name, last_name: doctor.profile.last_name, title: doctor.profile.title, image: doctor.profile.image_url});
//           })
//           this.setState({doctors: docs});
//         })
//         .catch(err => { console.log("ERROR FETCHING DOCTOR INFO") })
//     }else{
//       this.setState({docs: []});
//     }
//   }

// const PhysicianList = (props) => {
//   return (
//       <div>
//         { console.log(this.props.physicians) }
//       </div>
//   );
// }

// export default PhysicianList;




