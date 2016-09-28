'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  // added
  signUp: (params, cb) => {
    let data = [params.company_name, params.username, params.password];
    const queryString = 'INSERT INTO insurance_company_professional \
      (company_name, username password) VALUES (?,?,?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  signIn: (params, cb) => {
    let data = [params.username, params.company_name];
    const queryString = 'SELECT * FROM insurance_company_professional \
      WHERE username=? AND company_name=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkProfessional: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * FROM insurance_company_professional \
      WHERE email=? LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  initform_professional: (params, cb) => {
    let data = [params.username, params.email, params.phone_number,
      params.photo_path, params.id_Insurance_company];
    const queryString ='UPDATE insurance_company_professional SET username=?, email=?, \
      phone_number=?, photo_path=?, id_Insurance_company=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_password: (params, cb) => {
    let data = [params.password];
    const queryString ='UPDATE insurance_company_professional SET password=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // added
  // getInsurance_professional: (params, cb) => {
  //   let data = [params];
  //   const queryString = '';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // }

  // (params, cb) => {
  //   let data = [params];
  //   const queryString = ;
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },
};
