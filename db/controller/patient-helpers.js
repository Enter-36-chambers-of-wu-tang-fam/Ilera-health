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
  },

  initform_patient: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [ params.first, params.last, params.date_of_birth, params.address,
      params.city, params.state, params.zip, params.email, params.password,
      params.phone_number, params.photo_path, params.weight, params.height,
      params.blood_type];
    const queryString ='INSERT INTO patient(first, last, date_of_birth, address \
      city, state, zip, email, password, phone_number, photo_path, \
      weight, height, blood_type) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  emergency_contact_form:(params, cb) => {
    let data = [params.first, params.last, params.phone, params.email,
      params.relationship, params.id_patient];
    // Post request to: /api/user/emergency_contacts => { Emergency Table }
    const queryString = 'INSERT INTO emergency_contact(first, last, phone, email, \
      relationship, id_patient) value (?, ?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  init_insurance: (params, cb) => {
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.id_patient, params.id_insurance_client, params.type,
      params.policy_number];
    const queryString = 'INSERT INTO insurance(id_patient, id_insurance_client, type, \
      policy_number) value (?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_messages: (params, cb) => {
    // Get Request → /api/messages/:physid/:patid  [limit 5]
    let data = [params.receiver_id, params.sender_id];
    const queryString = 'SELECT * FROM messages WHERE receiver_id=? AND sender_id=? LIMIT 5';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  add_health_log: (params, cb) => {
    //  post to health_log
    let data = [params.date, params.note, params.photo_path, params.id_physician, params.id_patient];
    const queryString = 'INSERT INTO health_log(date, note, photo_path, id_physician, id_patient) \
      value (?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_health_logs: (params, cb) => {
    // Get Request → /api/healthlog/:physid/:patid  [ limit 5]
    let data = [params.id_patient];
    const queryString = 'SELECT * FROM health_log WHERE id_patient=? LIMIT 5';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  (params, cb) => {
    let data = [params]

    db.query(queryString, data, (error, results) => cb(error, results) );
  },

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

  physician_signUp: (params, cb) => {
    // Post Request To: /api/physician/signup i think this is a guess
    let data = [params.first, params.last, params.email, params.password];
    const queryString = 'INSERT INTO physician(first, last, email, password) \
      value (?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  patient_physician_relation: (params, cb) => {
    // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
      AND id_physician=? LIMIT 5';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  patient_info: (params, cb) => {
    // Post Request to : api/user/main  =>   { Patient main page }
    // let data = [params.a.id, a.date, a.time, a.notes, a.id_physician, p.first, p.last, p_m.drug_name, p_m.dosage]
    // a = appointment
    // p_m = patient_medication
    // p = patient
    const queryString = 'SELECT a.id, a.date, a.time, a.notes, \
      a.id_physician, p.first, p.last, p_m.drug_name, p_m.dosage, \
      FROM patient p \
      JOIN appointment a ON a.id_patient = p.id \
      JOIN patient_medication p_m ON p_m.id_patient = p.id';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }
  
};

module.exports = Patients;




// =====================
// scratch paper













// Get Request To: api/physician/calendar/:id/:date
// const queryString = 'SELECT * FROM '



// `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
// `direct_message` VARCHAR(10000) NULL,
// `date` TIMESTAMP NULL,
// `sender_id` INTEGER UNSIGNED DEFAULT NULL,
// `receiver_id` INTEGER UNSIGNED DEFAULT NULL,
// PRIMARY KEY (`id`)
