'use strict'

const db = require('../dbConnect/connection.js');

module.exports = {

  make_appointment:(params, cb) => {
    let data = [params.date, params.time, params.notes];
    const queryString = 'INSERT INTO appointment(date, time, notes) value (?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  get_one_appointment_by_pat_id: (params, cb) => {
    let data = [params.id_patient];
    const queryString = 'SELECT * FROM appointment WHERE id_patient = '+params.id_patient;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  get_one_appointment_by_phY_id: (params, cb) => {
    let data = [params.id_physician];
    const queryString = 'SELECT * FROM appointment WHERE id_physician = '+params.id_physician;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  update_appointment: (params, cb) => {
    let data = [ (params.date || null), (params.time || null), (params.notes || null) ];
    const queryString = 'UPDATE appointment SET date=?, time=?, notes=? \
      WHERE id ="'+params.id+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  cancel_appointment: (params, cb) => {
    let data = [params.id];
    const queryString = 'DELETE FROM appointment WHERE id=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

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
  },

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
