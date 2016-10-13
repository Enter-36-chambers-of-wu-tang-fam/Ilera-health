'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  post_initInsurance_plan: (params, cb) => {
    console.log("INSURANCE", params)
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.uid, params.id_insurance_company, params.betterDoctorUID,
      params.primary_name, params.primary_phone, params.primary_address,
      params.primary_city, params.primary_state, params.primary_zip,
      params.insurer1, params.insurance_type1, params.insurance_network1,
      params.policy_number1, params.insurer2, params.insurance_type2,
      params.insurance_network2, params.policy_number2, params.member_id,
      params.payer_id];
      console.log("init_insurance_plan", data);
    const queryString = 'INSERT INTO insurance_plan\
      (id_patient, id_insurance_company, betterDoctorUID, primary_name, \
      primary_phone, primary_address, primary_city, primary_state, \
      primary_zip, insurer1, insurance_type1, insurance_network1, \
      policy_number1, insurer2, insurance_type2, insurance_network2, \
      policy_number2, member_id, payer_id) \
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  put_Insurance_plan: (params, cb) => {
    console.log("INSURANCE", params)
    // Put Request To: api/user/insurance/update => { insurance plan }
    let data = [params.id_insurance_company,
      params.betterDoctorUID, params.primary_name, params.primary_phone,
      params.primary_address, params.primary_city, params.primary_state,
      params.primary_zip, params.insurer1, params.insurance_type1,
      params.insurance_network1, params.policy_number1, params.insurer2,
      params.insurance_type2, params.insurance_network2, params.policy_number2,
      params.member_id, params.payer_id, params.uid];
    const queryString = 'UPDATE insurance_plan \
      SET id_insurance_company=?, betterDoctorUID=?, primary_name=?, \
      primary_phone=?, primary_address=?, primary_city=?, primary_state=?, \
      primary_zip=?, insurer1=?, insurance_type1=?, insurance_network1=?, \
      policy_number1=?, insurer2=?, insurance_type2=?, insurance_network2=?, \
      policy_number2=?, member_id=?, payer_id=? \
      WHERE id_patient=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_one_by_id: (params, cb) => {
    let data = [params.id];
    console.log("get_one", data);
    const queryString = 'SELECT * \
      FROM insurance_plan \
      WHERE id=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_one_patientPlan: (params, cb) => {
    let data = [params.userid, params.id_Insurance_company];
    console.log("get_one_patientPlan", data);
    const queryString = 'SELECT * \
      FROM insurance_plan \
      WHERE id_patient=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_by_id_Insurance_company: (params, cb) => {
    let data = [params.id_Insurance_company];
    console.log("get_one", data);
    const queryString = 'SELECT * \
      FROM insurance_plan \
      WHERE id_Insurance_company=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // no longer in use because the schema was updated
  update_insurance_plan: (params, cb) => {
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.uid, params.id_insurance_company, params.plan,
      params.policy_number, params.payer_id];
    console.log("update_insurance_plan", data);
    const queryString = 'UPDATE insurance_plan \
      SET id_patient=?, id_insurance_company=?, plan=?, \
      policy_number=?, payer_id=? \
      WHERE id ="'+params.id+'" \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};
