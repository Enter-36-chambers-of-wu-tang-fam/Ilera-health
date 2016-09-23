'use strict'

const db = require('../dbConnect/connection.js');

module.exports.institution = {

  make_appointment:(params, cb) => {
    let data = [params.date, params.time, params.notes];
    const queryString = 'INSERT INTO appointment(date, time, notes) value (?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  new_medication: (params, cb) => {
    let data = [params.drug_name, params.dosage];
    const queryString = 'INSERT INTO patient_medication(drug_name, dosage)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },


  patient_physician_relation: (params, cb) => {
    // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
      AND id_physician=? LIMIT 5';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }
  // (params, cb) => {
  //   let data = [params];
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },
};
