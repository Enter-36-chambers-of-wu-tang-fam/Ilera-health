import axios from 'axios';
import * as types from './action-constants';

/////////////// GET ALL USER INFO //////////////////

const getUserInfoRequest = () => {
  return {
    type: types.GET_USER_INFO_REQUEST,
    isFetching: true,
    loaded: false
  }
};


const getUserInfoSuccess = (user) =>{
  return {
      type: types.GET_USER_INFO_SUCCESS,
      isFetching: false,
      loaded: true,
      payload: user
    }
};

const getUserInfoFailed = (err) => {
  return {
    type: types.GET_USER_INFO_FAILURE,
    payload: err
  }
};

//Action call below for sign up --> uncomment export default

export function getUserInfo(uid) {
    console.log("HELLO?", uid)
  return (dispatch) => {
    dispatch(getUserInfoRequest());

    axios.get(`/api/patientInformation/${uid}`)
    .then( user => {
        var userBasic = {};
        var userHealth = {};
        var userEContacts = {};
        var userInsurance = {};
        var userPrimaryDoc = {};
        console.log("USER", user.data[0])
        for(let item in user.data[0]){
            
            if( item === 'first' || item === 'middle' || item === 'last' || item === 'marital_status' || item === 'date_of_birth' || item === 'birth_city' || item === 'birth_country' || item === 'address' || item === 'city' || item === 'state' || item === 'zip' || item === 'primary_phone_number' || item === 'secondary_phone_number' || item === 'primary_language' || item === 'secondary_language'){
                userBasic[item] = user.data[0][item] || null;
            }

            if( item === 'allergies' || item === 'blood_type' || item === 'conditions' || item === 'height' || item === 'gender' || item === 'medications' || item === 'procedures' || item === 'weight'){
                userHealth[item] = user.data[0][item] || null;
            }

            if( item === 'e_2_contact_first' || item === 'e_1_contact_last' || item === 'e_1_contact_email' || item === 'e_1_contact_relationship' || item === 'e_2_contact_first' || item === 'e_2_contact_last' || item === 'e_2_contact_email' || item === 'e_2_contact_relationship'){
                userEContacts[item] = user.data[0][item] || null;
            }

            if( item === 'insurer1' || item === 'insurance_type1' || item === 'insurance_network1' || item === 'insurer2' || item === 'insurance_type2' || item === 'insurance_network2'){
                userInsurance[item] = user.data[0][item] || null;
            }
        }
        var userInfo = {
            userBasic: userBasic,
            userHealth: userHealth,
            userEContacts: userEContacts,
            userInsurance: userInsurance
        }
      
      dispatch(getUserInfoSuccess(userInfo))
    })
    .catch(err => {
      dispatch(getUserInfoFailed(err));
    });
  }
}
