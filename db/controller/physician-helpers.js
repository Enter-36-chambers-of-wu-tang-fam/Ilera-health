'use strict'

const db = require('../dbConnect/connection.js');

const Physician = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * FROM physician WHERE email =? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO physician (first, last, email, password) VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkPatient: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * FROM physician WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};

module.exports = Physician;
