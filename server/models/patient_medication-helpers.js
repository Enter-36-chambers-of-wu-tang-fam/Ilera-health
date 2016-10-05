'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  getAll_patientMeds: (params, cb) => {
    let data = [params.userid];
    const queryString = 'SELECT * FROM patient_medication \
      WHERE id_patient=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};
