'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  make_appointment:(params, cb) => {
    let data = [params.date, params.time, params.notes, params.id_physician,
      params.id_patient];
    const queryString = 'INSERT INTO appointment(date, time, notes, \
      id_physician, id_patient) \
      value (?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  get_one_appointment_by_pat_id: (params, cb) => {
    let data = [params.id_patient];
    const queryString = 'SELECT * FROM appointment \
      WHERE id_patient = '+params.id_patient;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_physician_appointments_and_patient_info: (params, cb) => {
    console.log('get_all_physician_appointments_and_patient_info',params);
    let data = [params.uid];
    const queryString = 'SELECT p.id, p.first, p.last, p.photo_path, \
      a.id, a.date, a.time, a.notes, a.id_physician, a.id_patient, \
      a.id_institution \
      FROM appointment a \
      JOIN patient p \
      ON p.id = a.id_patient \
      WHERE a.id_physician =?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  get_all_appointment_by_phY_id: (params, cb) => {
    let data = [params.id_physician];
    const queryString = 'SELECT * \
      FROM appointment \
      WHERE id_physician = '+params.id_physician;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_appointment_by_pat_id: (params, cb) => {
    let data = [params.id_patient];
    const queryString = 'SELECT a.id, a.date, a.time, a.notes, \
    a.id_physician, a.id_patient, a.id_institution, \
    py.title, py.first, py.last, py.email \
    FROM appointment a \
    JOIN physician py \
    ON py.id = a.id_physician \
    WHERE id_patient = ' + params.id_patient + ' \
    ORDER by date';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  update_appointment: (params, cb) => {
    let data = [ (params.date || null), (params.time || null),
      (params.notes || null) ];
    const queryString = 'UPDATE appointment \
      SET date=?, time=?, notes=? \
      WHERE id ="'+params.id+'" \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  cancel_appointment: (params, cb) => {
    let data = [params.id];
    const queryString = 'DELETE FROM appointment \
    WHERE id=? \
    LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};

