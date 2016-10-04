'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  get_patient_physician_relation: (params, cb) => {
    // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
    let data = [params.id_patient, params.id_physician];
    const queryString = 'SELECT * FROM patient_physician WHERE id_patient=? \
    AND id_physician=?';
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
    let data = [params.userid];
    const queryString = "SELECT p.id, p.first, p.last, p.email, \
      p.date_of_birth, p.address, p.city, p.state, p.zip, \
      p.primary_phone_number, p.weight, p.height, p.blood_type, p.photo_path \
      FROM patient_physician pr \
      JOIN patient p ON p.id = pr.id_patient AND pr.id_physician=? \
      ORDER BY p.last DESC";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  get_all_physicians_of_patient: (params, cb) => {
    let data = [params.userid];
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
  },

  test_get_all_physicians_of_patient: (params, cb) => {
    let data = [params.userid];
    const queryString = "SELECT pr.id_physician, py.id, py.first, py.last, \
      py.email, py.phone_number, py.photo_path, py.specialty \
      FROM patient_physician pr \
      JOIN physician py ON py.id = pr.id_physician AND pr.id_patient=? \
      ORDER BY py.last DESC";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  delete_PatientPhysicianRelation: (params, cb) => {
    let data = [params.id_physician, params.id_patient];
    console.log(data);
    const queryString = "DELETE FROM patient_physician WHERE \
      id_physician=? AND id_patient=?";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params.id_physician, params.id_patient];
  //   const queryString = "INSERT INTO patient_physician(id_physician, id_patient) \
  //     value (?,?)";
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // }


};
// test Data to check if the Join queries work

// INSERT INTO `physician` (`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES ('neekon','nee','nee','34214321','nee','nee','nee');
//
// INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','1');
//
//
// INSERT INTO `institution` (`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES ('wu tang','36chambers','fixer','12','1423','2413','sanjose','ca','4231','wu@gmail');
//
// INSERT INTO `physician_institution` (`id_institution`,`id_physician`) VALUES ('1','1');

// SELECT p.id, p.first, p.last, p.email, p.date_of_birth, p.address, p.city, p.state, p.zip, p.phone_number, p.weight, p.height, p.blood_type, p.photo_path FROM patient_physician pr JOIN patient p ON p.id = pr.id_patient AND pr.id_physician=1 ORDER BY p.last DESC;

// SELECT pr.id_physician, py.id, py.first, py.last, py.email, py.phone_number, py.photo_path, py.specialty, i.id, i.inst_name, i.type, i.description, i.rating, i.phone_number, i.address, i.city, i.state, i.zip, i.email, pi.id, pi.id_institution FROM patient_physician pr JOIN physician py ON py.id = pr.id_physician AND pr.id_patient= 1 JOIN physician_institution pi ON pi.id_physician = pr.id_physician JOIN institution i ON i.id = pi.id_institution ORDER BY py.last DESC;
