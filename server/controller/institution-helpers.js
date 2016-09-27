'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  // added
  // use get_patient_physician_relation to make sure they do not alread have a relation
  create_patient_physician_relation: (params, cb) => {
    let data = [params.id_physician, params.id_patient];
    const queryString = "INSERT INTO patient_physician(id_physician, id_patient) \
      value (?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_patient_physician_relation: (params, cb) => {
    // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
      AND id_physician=? LIMIT 50';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params];
  //   const queryString = ;
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },
};
