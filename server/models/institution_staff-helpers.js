'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  post_relation: (params, cb) => {
    let data = [params.uid, params.id];
    const queryString = 'INSERT INTO institution_staff (id_staff, \
      id_institution) VALUES (?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params.id_patient];
  //   const queryString = '';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },


};


// CREATE TABLE `institution_staff` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `id_staff` INTEGER DEFAULT NULL,
//   `id_institution` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );
