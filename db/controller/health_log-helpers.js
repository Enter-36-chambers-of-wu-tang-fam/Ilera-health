'use strict'

const db = require('../dbConnect/connection.js');


module.exports = {

  // added
  get_all_health_logs_by_patient_id: (params, cb) => {
    // Get Request → /api/healthlog/:physid/:patid  [ limit 10]
    let data = [params.id_patient];
    const queryString = 'SELECT * FROM health_log WHERE id_patient=? LIMIT 10';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  get_one_health_log:(params, cb) => {
    let data = [params.id];
    const queryString = 'SELECT * FROM health_log WHERE id=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  patient_get_all_health_logs_by_physician_id:(params, cb) => {
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM health_log WHERE id_patient=? \
      AND id_physician=? LIMIT 50';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },


  add_health_log: (params, cb) => {
    //  post to health_log
    let data = [params.physician_date, params.physician_notes, params.physician_photo_path,
      params.id_physician, params.id_patient];
    const queryString = 'INSERT INTO health_log(physician_date, physician_notes, \
      physician_photo_path, id_physician, id_patient) value (?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  patient_update_health_log: (params, cb) => {
    let data = [params.patient_date, params.patient_note, params.patient_photo_path];
    const queryString = 'UPDATE health_log SET patient_date=?, patient_note=?, \
      patient_photo_path=? WHERE id ="'+params.id+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  physician_update_health_log: (params, cb) => {
    let data = [params.physician_date, params.physician_notes,
      params.physician_photo_path];
    const queryString = 'UPDATE health_log SET physician_date=?, \
      physician_notes=?, physician_photo_path=? WHERE id ="'+params.id+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  deleteOne_health_log: (params, cb) => {
    let data = [params.id];
    const queryString = 'DELETE FROM health_log WHERE id=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }


  // (params, cb) => {
  //   let data = [params.id_patient];
  //   const queryString = '';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};
