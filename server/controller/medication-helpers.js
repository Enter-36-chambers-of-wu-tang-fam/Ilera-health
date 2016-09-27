'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  //added params here and miodified queryString
  new_medication: (params, cb) => {
    let data = [params.drug_name, params.dosage, params.id_medication,
      params.id_physician, params.id_patient];
    const queryString = 'INSERT INTO patient_medication(drug_name, dosage, \
      id_medication, id_physician, id_patient) value (?,?,?,?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  getAll_patient_medication: (params, cb)=>{
    let data = [params.id_patient];
    const queryString = 'SELECT * FROM patient_medication WHERE \
      id_patient=? LIMIT 40';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }
  
};
