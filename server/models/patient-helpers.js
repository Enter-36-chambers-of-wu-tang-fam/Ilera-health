'use strict'

const db = require('../db/dbConnect/connection.js');


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
    console.log("**", params.email)
    let data = [params.email];
    const queryString = "SELECT * FROM patient WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  initform_patient: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
<<<<<<< a0d0cc22e98056977fc30ac2e99cb29bdbce98c4
    let data = [ params.first, params.last, params.middle, params.maiden,
      params.date_of_birth, params.birth_city, params.birth_country,
      params.marital_status, params.primary_language, params.secondary_language,
      params.gender, params.weight, params.height, params.blood_type,
      params.conditions, params.procedures, params.medications, params.allergies];
    const queryString ='UPDATE patient SET first=?, last=?, middle=?, \
      maiden=?, date_of_birth=?, birth_city=?, \
      birth_country=?, marital_status=?, primary_language=?, \
      secondary_language=? \
      WHERE id='+ params.uid;
=======
    console.log("GAAAAHHH", params)
    let data = [ params.first, params.last, params.middle, params.maiden, params.date_of_birth, params.birth_city,
      params.birth_country, params.marital_status, params.primary_language, params.secondary_language, params.gender, params.weight, params.height, params.blood_type, params.conditions, params.procedures, params.medications, params.allergies];
    const queryString ='UPDATE patient SET first=?, last=?, middle=?, maiden=?, date_of_birth=?, birth_city=?, \
      birth_country=?, marital_status=?, primary_language=?, secondary_language=? WHERE id='+ params.uid;
>>>>>>> reworked styling and basic message functionality
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  initform_patient_health: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [ params.gender, params.weight, params.height,
      params.blood_type, params.conditions, params.procedures,
      params.medications, params.allergies];
    const queryString ='UPDATE patient SET gender=?, weight=?, \
      height=?, blood_type=?, conditions=?, procedures=?, \
      medications=?, allergies=? WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  initform_patient_contact: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [ params.address, params.city, params.state, params.zip,
      params.primary_phone_number, params.secondary_phone_number];
    const queryString ='UPDATE patient SET address=?, city=?, state=?, \
      zip=?, primary_phone_number=?, secondary_phone_number=? \
      WHERE id='+ params.uid;
      db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_password: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [params.password];
    const queryString ='UPDATE patient SET password=? WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_patient: (params, cb) => {
    console.log("**", params.userid)
    let data = [params.userid];
    const queryString = "SELECT * FROM patient WHERE id=? LIMIT 1";
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
