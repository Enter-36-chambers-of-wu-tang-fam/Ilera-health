'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  get_insurance: (params, cb) => {
    const queryString = 'SELECT DISTINCT insurer FROM insurance \
      ORDER BY insurer';
    db.query(queryString, (error, results) => cb(error, results) );
  },

  get_specific_insurance: (params, cb) => {
    let data = [params.insurer];
      console.log("insurance", data);
    const queryString = 'SELECT * FROM insurance WHERE insurer=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};

// DROP TABLE IF EXISTS `insurance`;
//
// CREATE TABLE `insurance` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `insurer` varchar(255) NULL,
//   `type` varchar(255) NULL,
//   `network` varchar(255) NULL,
//   `uid` varchar(255) NULL,
//   PRIMARY KEY (`id`)
// );
