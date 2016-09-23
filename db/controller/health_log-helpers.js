'use strict'

const db = require('../dbConnect/connection.js');


module.exports.health_log = {

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
  }
  //  (params, cb) => {
  //   let data = [params.id_patient];
  //
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};
