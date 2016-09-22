'use strict'

const db = require('../dbConnect/connection.js');

const Patients = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * FROM patient WHERE email =? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO patient (first, last, email, password) VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkPatient: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * FROM patient WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};

module.exports = Patients;




// =====================
// scratch paper
// a = appointment

const queryString = 'SELECT a.id, a.date, a.time, a.notes, \
  a.id_physician, p.first, p.last, p_m.drug_name, p_m.dosage, \
  FROM patient p \
  JOIN appointment a ON a.id_patient = p.id \
  JOIN patient_medication p_m ON p_m.id_patient = p.id';

// Post Request to: api/user/signup  =>   { Patient Table}
const queryString ='INSERT INTO patient(first, last, date_of_birth, address \
  city, state, zip, email, password, phone_number, photo_path, \
  weight, height, blood_type) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

const queryString = 'INSERT INTO appointment(date, time, notes) value (?, ?, ?)';

const queryString = 'INSERT INTO patient_medication(drug_name, dosage)';
// Post request to: /api/user/emergency_contacts => { Emergency Table }
const queryString = 'INSERT INTO emergency_contact(first, last, phone, email, \
  relationship, id_patient) value (?, ?, ?, ?, ?, ?)';
// Post Request To: api/user/insurance => { insurance }
const queryString = 'INSERT INTO insurance(id_patient, id_insurance_client, type, \
  policy_number)';
// Post Request To: /api/physician/signup i think this is a guess
const queryString = 'INSERT INTO physician(first, last, email, password) \
  value (?, ?, ?, ?)';
//  post to health_log
const queryString = 'INSERT INTO health_log(date, note, photo_path, id_physician, id_patient) \
  value (?, ?, ?, ?, ?)';
// Get Request → /api/healthlog/:physid/:patid  [ limit 5]
const queryString = 'SELECT * FROM health_log WHERE id_patient=? LIMIT 5';
// Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
  AND id_physician=? LIMIT 5';
// Get Request → /api/messages/:physid/:patid  [limit 5]
const queryString = 'SELECT * FROM messages WHERE receiver_id=? AND sender_id=? LIMIT 5';
// Get Request To: api/physician/calendar/:id/:date
// const queryString = 'SELECT * FROM '



// `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
// `direct_message` VARCHAR(10000) NULL,
// `date` TIMESTAMP NULL,
// `sender_id` INTEGER UNSIGNED DEFAULT NULL,
// `receiver_id` INTEGER UNSIGNED DEFAULT NULL,
// PRIMARY KEY (`id`)
