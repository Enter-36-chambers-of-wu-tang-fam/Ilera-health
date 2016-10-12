'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  //added params here and miodified queryString
  new_medication: (params, cb) => {
    console.log("I'm reached", params);
    let data = [params.drug_name, params.dosage, params.id_medication,
      params.id_physician, params.id_patient, params.start_date, params.end_date];
    const queryString = 'INSERT INTO patient_medication \
      (drug_name, dosage, id_medication, id_physician, id_patient, \
      start_date, end_date) \
      value (?,?,?,?,?,?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  getAll_patientMeds: (params, cb) => {
    let data = [params.userid];
    const queryString = 'SELECT * \
      FROM patient_medication \
      WHERE id_patient=? \
      LIMIT 40';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  getAll_patient_medicationAndPhysician_info: (params, cb) => {
    let data = [params.userid];
    const queryString = 'SELECT m.id, m.drug_name, m.dosage, m.id_medication, \
      m.id_physician, m.id_patient, m.start_date, m.end_date, \
      py.id, py.betterDoctorUID, py.first, py.last, py.email, py.phone_number, \
      py.photo_path, py.specialty \
      FROM patient_medication m \
      JOIN physician py \
      ON py.id = m.id_physician \
      WHERE m.id_patient=? \
      LIMIT 40';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb)=>{
  //   let data = [params.userid];
  //   const queryString = 'SELECT * FROM patient_medication WHERE \
  //     id_patient=? LIMIT 40';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // }

};
// medication
// med.id, med.drug_name, med.details
// physician
// py.id, py.betterDoctorUID, py.first, py.last, py.email, py.phone_number, py.photo_path, py.specialty
// patient_medication
// m.id, m.drug_name, m.dosage, m.id_medication, m.id_physician, m.id_patient, m.start_date, m.end_date

// SELECT m.id, m.drug_name, m.dosage, m.id_medication,
//   m.id_physician, m.id_patient, m.start_date, m.end_date, py.id,
//   py.betterDoctorUID, py.first, py.last, py.email, py.phone_number,
//   py.photo_path, py.specialty
//   FROM patient_medication m
//   JOIN physician py ON py.id = m.id_physician
//   WHERE m.id_patient=7 LIMIT 40;



// 'use strict'
//
// const db = require('../db/dbConnect/connection.js');
//
// module.exports = {
//
//   getAll_patientMeds: (params, cb) => {
//     let data = [params.userid];
//     const queryString = 'SELECT * FROM patient_medication \
//       WHERE id_patient=?';
//     db.query(queryString, data, (error, results) => cb(error, results) );
//   }
//
// };
