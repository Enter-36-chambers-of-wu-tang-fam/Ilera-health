'use strict'

const db = require('../db/dbConnect/connection.js');
const fs = require('fs');

const checkIfFile = (file, cb) => {
  fs.stat(file, function fsStat(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
				console.log("what's going on??", err)
        return cb(null, false);
      } else {
        return cb(err);
      }
    }
    return cb(null, stats.isFile());
  });
};

module.exports = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * \
      FROM patient \
      WHERE email =? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO patient \
      (first, last, email, password) \
      VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkPatient: (params, cb) => {
    console.log("**", params.email)
    let data = [params.email];
    const queryString = "SELECT * \
      FROM patient \
      WHERE email=? \
      LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  getPatientInfoByID: (params, cb) => {
    let data = [params.uid];
    const queryString = 'SELECT * \
      FROM patient \
      WHERE id =? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },


  initform_patient: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    console.log(params);
    module.exports.getPatientInfoByID(params, (err, patientInfo)=> {
      console.log('all patient info',patientInfo);
      console.log('first name',patientInfo[0].first);
      // console.log(RowDataPacket);
      // RowDataPacket
      let data = [ (params.first || patientInfo[0].first),
        (params.last || patientInfo[0].last), params.middle,
        params.maiden, params.address, params.city, params.state,
        params.zip, params.primary_phone_number,
        params.secondary_phone_number, params.date_of_birth,
        params.birth_city, params.birth_country,
        params.marital_status, params.primary_language,
        params.secondary_language];
        const queryString ='UPDATE patient \
          SET first=?, last=?, middle=?, \
          maiden=?, address=?, city=?, state=?, zip=?, primary_phone_number=?, \
          secondary_phone_number=?, date_of_birth=?, birth_city=?, \
          birth_country=?, marital_status=?, primary_language=?, \
          secondary_language=? \
          WHERE id='+ params.uid;
        db.query(queryString, data, (error, results) => cb(error, results) );
    })
  },

  initform_patient_health: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [ params.gender, params.weight, params.height,
      params.blood_type, params.conditions, params.procedures,
      params.medications, params.allergies];
    const queryString ='UPDATE patient \
      SET gender=?, weight=?, \
      height=?, blood_type=?, conditions=?, procedures=?, \
      medications=?, allergies=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  initform_patient_contact: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [ params.address, params.city, params.state, params.zip,
      params.primary_phone_number, params.secondary_phone_number];
    const queryString ='UPDATE patient \
      SET address=?, city=?, state=?, zip=?, primary_phone_number=?, \
      secondary_phone_number=? \
      WHERE id='+ params.uid;
      db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_password: (params, cb) => {
    // Post Request to: api/user/initform  =>   { Patient Table}
    let data = [params.password];
    const queryString ='UPDATE patient \
      SET password=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  delete_photo: (params, cb) => {
    const queryString = 'SELECT photo_path \
      FROM patient \
      WHERE id='+params.uid;
    db.query(queryString,(error, results)=> {
      checkIfFile(__dirname + `/../../client/${results[0].photo_path}`, (err,stats) => {
				console.log("I'm called!!!", err,stats)
        if(err) console.log(err);
        if(stats){
          fs.unlink(__dirname + `/../../client/${results[0].photo_path}`, (erro) =>
          erro ? console.log(erro) : console.log("Successful Delete"));
        }
          const nullQuery ='UPDATE patient \
            SET photo_path=NULL \
            WHERE id='+params.uid;
          db.query(queryString, (err, status) => cb(err,status))
      })
    })
  },



  update_photo: (params, cb) => {
    let data = [params.photo_path];
    const queryString ='UPDATE patient \
      SET photo_path=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_patient: (params, cb) => {
    console.log(params.userid)
    let data = [params.userid];
    const queryString = "SELECT * \
      FROM patient \
      WHERE id=? \
      LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_records: (params, cb) => {
    const queryString = "SELECT * \
      FROM med_records \
      WHERE id_patient="+ params.uid;
    db.query(queryString, (error, results) => cb(error, results) );
  },

  delete_record: (params, cb) => {
    const queryString = "DELETE FROM med_records \
    WHERE id="+params.body.id+" \
    AND id_patient="+ params.params.uid;
    db.query(queryString, (error, results) => {
      checkIfFile(__dirname + `/../../client/${params.body.path}`, (err,stats) => {
        if(err) console.log(err);
        if(stats){
          fs.unlink(__dirname + `/../../client/${params.body.path}`, (erro) => erro ? console.log(erro) : '');
        }
        cb(error, results)
      });
    })
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
  // (params, cb) => {
  //   let data = [params]
  //
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};






// =====================
// scratch paper


// patient table
// CREATE TABLE `patient` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `first` VARCHAR(30) NULL DEFAULT NULL,
//   `last` VARCHAR(30) NULL DEFAULT NULL,
//   `middle` VARCHAR(30) NULL DEFAULT NULL,
//   `maiden` VARCHAR(30) NULL DEFAULT NULL,
//   `email` VARCHAR(30) NOT NULL,
//   `password` VARCHAR(300) NULL DEFAULT NULL,
//   `pin` INTEGER(4) NULL DEFAULT NULL,
//   `date_of_birth` VARCHAR(100) NULL DEFAULT NULL,
//   `birth_city` VARCHAR(60) NULL DEFAULT NULL,
//   `birth_country` VARCHAR(60) NULL DEFAULT NULL,
//   `marital_status` VARCHAR(60) NULL DEFAULT NULL,
//   `address` VARCHAR(60) NULL DEFAULT NULL,
//   `city` VARCHAR(60) NULL DEFAULT NULL,
//   `state` VARCHAR(20) NULL DEFAULT NULL,
//   `zip` VARCHAR(10) NULL DEFAULT NULL,
//   `primary_phone_number` VARCHAR(20) NULL DEFAULT NULL,
//   `secondary_phone_number` VARCHAR(20) NULL DEFAULT NULL,
//   `gender` VARCHAR(20) NULL DEFAULT NULL,
//   `weight` INTEGER NULL DEFAULT NULL,
//   `height` INTEGER NULL DEFAULT NULL,
//   `blood_type` VARCHAR(3) NULL DEFAULT NULL,
//   `conditions` VARCHAR(500) NULL DEFAULT NULL,
//   `procedures` VARCHAR(500) NULL DEFAULT NULL,
//   `medications` VARCHAR(500) NULL DEFAULT NULL,
//   `allergies` VARCHAR(500) NULL DEFAULT NULL,
//   `primary_language` VARCHAR(30) NULL DEFAULT NULL,
//   `secondary_language` VARCHAR(30) NULL DEFAULT NULL,
//   `photo_path` VARCHAR(200) NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );









// Get Request To: api/physician/calendar/:id/:date
// const queryString = 'SELECT * FROM '



// `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
// `direct_message` VARCHAR(10000) NULL,
// `date` TIMESTAMP NULL,
// `sender_id` INTEGER UNSIGNED DEFAULT NULL,
// `receiver_id` INTEGER UNSIGNED DEFAULT NULL,
// PRIMARY KEY (`id`)

