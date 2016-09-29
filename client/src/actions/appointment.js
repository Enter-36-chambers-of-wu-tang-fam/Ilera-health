import axios from 'axios';

export const getCurrentBookings = (physid) => {
  let currAppts = {};
  axios.get(`/api/patient/getappointment/${physid}`).then( dates => { //get all of the physicians currently booked appointments
    dates.data.forEach(item => {
      console.log("****ITEMITEMITEM****",item);
      let date = item.date.slice(0,10);  
      if(currAppts[date]) currAppts[date][item.time] = true;
      else {
        currAppts[date] = {};
        currAppts[date][item.time] = true;
      } 
    })
  })
  .catch(err => console.log(err) );

  return {
    type: 'ALL_PHYSICIAN_APPOINTMENTS',
    payload: currAppts
  }
}



export const setAppointment = (data) => {
  axios.post('/api/patient/setappointment', data).then(set => {
   console.log("SUCCESSFUL POST?", set); 
  })
  .catch(err => console.log("POST ERROR", err));

 return function(dispatch){
  dispatch({
    type: types.SET_APPOINTMENT,
    payload: data
  })
 }
}

