'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  post_relation: (params, cb) => {
    let data = [params.uid, params.id];
    const queryString = 'INSERT INTO institution_staff \
      (id_staff, id_institution) \
      VALUES (?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};