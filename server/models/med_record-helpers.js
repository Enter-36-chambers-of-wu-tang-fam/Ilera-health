'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

 upload_document: (params, cb) => {
    let data = [params.date, params.type, params.document_path, params.description,  params.uid];
    const queryString = "INSERT INTO med_records \
      (date, type, document_path, description, id_patient) \
      VALUES (?,?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_patient: (params, cb) => {
    console.log("**", params.userid)
    let data = [params.userid];
    const queryString = "SELECT * \
      FROM patient \
      WHERE id=? \
      LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // need to update this
  patient_info: (params, cb) => {
    // Post Request to : api/user/main  =>   { Patient main page }
    // let data = [params.a.id, a.date, a.time, a.notes, a.id_physician, p.first, p.last, p_m.drug_name, p_m.dosage]
    // a = appointment
    // p_m = patient_medication
    // p = patient
    const queryString = 'SELECT a.id, a.date, a.time, a.notes, \
      a.id_physician, p.first, p.last, p_m.drug_name, p_m.dosage, \
      FROM patient p \
      JOIN appointment a \
      ON a.id_patient = p.id \
      JOIN patient_medication p_m \
      ON p_m.id_patient = p.id';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};