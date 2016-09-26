'use strict'

const db = require('../dbConnect/connection.js');


module.exports = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * FROM patient WHERE email =? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO patient (first, last, email, password) \
      VALUES (?,?,?,?)";
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
      params.city, params.state, params.zip, params.email,
      params.phone_number, params.photo_path, params.weight, params.height,
      params.blood_type];
    const queryString ='UPDATE patient SET first=?, last=?, date_of_birth=?, address=?, \
      city=?, state=?, zip=?, email=?, phone_number=?, photo_path=?, \
      weight=?, height=?, blood_type=? WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  emergency_contact_form:(params, cb) => {
    let data = [params.first, params.last, params.phone, params.email,
      params.relationship, params.uid];
    // Post request to: /api/user/emergency_contacts => { Emergency Table }
    const queryString = 'INSERT INTO emergency_contact(first, last, phone, email, \
      relationship, id_patient) value (?, ?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  init_insurance: (params, cb) => {
    // Post Request To: api/user/insurance => { insurance }
    let data = [params.uid, params.id_insurance_client, params.type,
      params.policy_number];
      console.log("DATADATA", data);
    const queryString = 'INSERT INTO insurance(id_patient, id_insurance_client, type, \
      policy_number) value (?, ?, ?, ?)';
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
      JOIN appointment a ON a.id_patient = p.id \
      JOIN patient_medication p_m ON p_m.id_patient = p.id';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }
  // (params, cb) => {
  //   let data = [params]
  //
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};






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
