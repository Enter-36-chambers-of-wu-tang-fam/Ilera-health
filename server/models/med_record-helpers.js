'use strict'

const db = require('../db/dbConnect/connection.js');

const checkIfFile = (file, cb) => {
  fs.stat(file, function fsStat(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        return cb(null, false);
      } else {
        return cb(err);
      }
    }
    return cb(null, stats.isFile());
  });
};

module.exports = {

 upload_document: (params, cb) => {
    let data = [params.date, params.type, params.document_path, params.description,  params.uid];
    const queryString = "INSERT INTO med_records \
      (date, type, document_path, description, id_patient) \
      VALUES (?,?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  delete_photo: (params, cb) => {
    const queryString = 'SELECT photo_path \
    FROM patient \
    WHERE id='+params.uid;
    db.query(queryString,(error, results)=> {
      checkIfFile(`../client/${results[0].photo_path}`, (err,stats) => {
        if(err) console.log(err);
        if(stats){
          fs.unlink(`../client/${results[0].photo_path}`, (erro) =>
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
    console.log("**", params.userid)
    let data = [params.userid];
    const queryString = "SELECT * \
      FROM patient \
      WHERE id=? \
      LIMIT 1";
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
      JOIN appointment a \
      ON a.id_patient = p.id \
      JOIN patient_medication p_m \
      ON p_m.id_patient = p.id';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};