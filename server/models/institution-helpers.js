'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  get_all_institutions: (params, cb) => {
    const queryString = 'SELECT * \
      FROM Institution';
    db.query(queryString, (error, results) => cb(error, results) );
  },

  get_all_physician_institutions: (params, cb) => {
    let data = [params.id, params.id_physician];
    const queryString = 'SELECT * \
      FROM Institution \
      WHERE id=? AND id_physician=? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};