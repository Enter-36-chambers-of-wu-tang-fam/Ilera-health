'use strict'

const db = require('../dbConnect/connection.js');

const Patients = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * FROM patient WHERE email =? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    let data = [params.first, params.last, params.email, params.password];
    const queryString = "INSERT INTO patient (first, last, email, password) VALUES (?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkPatient: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * FROM patient WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};

module.exports = Patients;
