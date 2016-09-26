'use strict'

const db = require('../dbConnect/connection.js');


module.exports = {

  // added
  signUp: (params, cb) => {
    let data = [params.company_name, params.username, params.password];
    const queryString = 'INSERT INTO insurance_company_client (company_name, username \
      password) VALUES (?,?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  signIn: (params, cb) => {
    let data = [params.username, params.company_name];
    const queryString = 'SELECT * FROM insurance_company_client WHERE \
      username=? AND company_name=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  getInsurance_client: (params, cb) => {
    let data = [params];
    const queryString = '';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params];
  //   const queryString = ;
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },
};
