'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  signIn: (params, cb) => {
    console.log(params);
    let data = [params.email];
    const queryString = 'SELECT * \
      FROM staff \
      WHERE email =? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    console.log(params);
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO staff \
      (first, last, email, password) \
      VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkStaff: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * \
      FROM staff \
      WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_password: (params, cb) => {
    let data = [params.password];
    const queryString ='UPDATE staff \
      SET password=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  getStaffInfoByID: (params, cb) => {
    let data = [params.uid];
    const queryString = 'SELECT * \
      FROM staff \
      WHERE id =? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  init_staff_info: (params, cb) => {
    console.log("init_staff_info", params);

    module.exports.getStaffInfoByID(params, (err, staffInfo)=>{
      let data = [(params.first || staffInfo[0].first),
      (params.last || staffInfo[0].last),
      params.primary_phone_number, params.address, params.city, params.state,
      params.zip, params.birth_country];
      const queryString = 'UPDATE staff \
        SET first=?, last=?, phone_number=?, address=?, city=?, state=?, \
        zip=?, birth_country=? \
        WHERE id ="'+params.uid+'" \
        LIMIT 1';
      db.query(queryString, data, (error, results) => cb(error, results) );

    })

  }

};

// staff
// CREATE TABLE `staff` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `first` VARCHAR(50) NULL,
//   `last` VARCHAR(50) NULL,
//   `email` VARCHAR(100) NULL,
//   `phone_number` VARCHAR(25) NULL,
//   `password` VARCHAR(200) NULL,
//   `photo_path` VARCHAR(300) NULL,
//   `address` VARCHAR(1000) NULL,
//   `city` VARCHAR(1000) NULL,
//   `state` VARCHAR(10) NULL,
//   `zip` VARCHAR(10) NULL,
//   `birth_country` VARCHAR(100) NULL,
//   PRIMARY KEY (`id`)
// );
