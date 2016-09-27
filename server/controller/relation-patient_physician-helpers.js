'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  get_patient_physician_relation: (params, cb) => {
    // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
    AND id_physician=? LIMIT 50';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  // use get_patient_physician_relation to make sure they do not alread have a relation
  create_patient_physician_relation: (params, cb) => {
    let data = [params.id_physician, params.id_patient];
    const queryString = "INSERT INTO patient_physician(id_physician, id_patient) \
      value (?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_patients_of_Physician: (params, cb) => {
    let data = [params.id_physician];
    const queryString = "SELECT p.id, p.first, p.last, p.email, \
      p.date_of_birth, p.address, p.city, p.state, p.zip, \
      p.phone_number, p.weight, p.height, p.blood_type, p.photo_path \
      FROM patient_physician pr \
      JOIN patient p ON p.id = pr.id_patient AND pr.id_physician=? \
      ORDER BY p.last DESC";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_patient_Physicians: (params, cb) => {
    let data = [params.id_patient];
    const queryString = "SELECT pr.id_physician, py.id, py.first, py.last, \
      py.email, py.phone_number, py.photo_path, py.specialty, i.id, \
      i.inst_name, i.type, i.description, i.rating, i.phone_number, \
      i.address, i.city, i.state, i.zip, i.email, pi.id, pi.id_institution \
      FROM patient_physician pr \
      JOIN physician py ON py.id = pr.id_physician AND pr.id_patient=? \
      JOIN physician_institution pi ON pi.id_physician = pr.id_physician \
      JOIN institution i ON i.id = pi.id_institution \
      ORDER BY py.last DESC";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params.id_physician, params.id_patient];
  //   const queryString = "INSERT INTO patient_physician(id_physician, id_patient) \
  //     value (?,?)";
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // }


};
