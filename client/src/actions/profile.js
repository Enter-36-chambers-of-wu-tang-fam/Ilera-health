import axios from 'axios';
import * as types from './action-types';


const initialize = (form, values, keepDirty) =>{
    return {
        type: types.INITIALIZE, 
        meta: { form, keepDirty }, 
        payload: values 
    }
};


export function getFieldInfo (userid) {
  console.log("HHHHHERERERERER")
  return dispatch => {
    return axios.get(`/api/patient/${userid}`).then( data => { 
        // dates.data.forEach(data => {
        console.log("****DATADATA****",data);
        dispatch(initialize('BackgroundInfoFormInitialized', data, true));
        //   let date = item.date.slice(0,10);  
        //   if(currAppts[date]) currAppts[date][item.time] = true;
        //   else {
        //     currAppts[date] = {};
        //     currAppts[date][item.time] = true;
        //   } 
        // })
    })
    .catch(err => console.log(err) );
  }

}
