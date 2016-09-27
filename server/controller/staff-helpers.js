'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * FROM staff WHERE email =? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO staff (first, last, email, password) \
      VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkStaff: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * FROM staff WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  init_staff_info: (params, cb) => {
    let data = [params.first, params.last, params.email, params.phone_number,
      params.photo_path];
    const queryString = 'UPDATE staff SET first=?, last=?, email=?, phone_number=? \
      photo_path=? WHERE id ="'+params.uid+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};
