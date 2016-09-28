'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  init_insurance_plan: (params, cb) => {
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.uid, params.id_insurance_company, params.plan,
      params.policy_number, params.payer_id];
      console.log("init_insurance_plan", data);
    const queryString = 'INSERT INTO insurance_plan(id_patient, id_insurance_company, plan, \
      policy_number, payer_id) value (?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },
  
  get_one_by_id: (params, cb) => {
    let data = [params.id];
    console.log("get_one", data);
    const queryString = 'SELECT * FROM insurance_plan WHERE id=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_one_patientPlan: (params, cb) => {
    let data = [params.id_patient, params.id_Insurance_company];
    console.log("get_one_patientPlan", data);
    const queryString = 'SELECT * FROM insurance_plan WHERE id_patient=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_by_id_Insurance_company: (params, cb) => {
    let data = [params.id_Insurance_company];
    console.log("get_one", data);
    const queryString = 'SELECT * FROM insurance_plan WHERE id_Insurance_company=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_insurance_plan: (params, cb) => {
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.uid, params.id_insurance_company, params.plan,
      params.policy_number, params.payer_id];
    console.log("update_insurance_plan", data);
    const queryString = 'UPDATE insurance_plan SET id_patient=?, \
      id_insurance_company=?, plan=?, policy_number=?, payer_id=? \
      WHERE id ="'+params.id+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params];
  //   const queryString = 'insurance_plan';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};
