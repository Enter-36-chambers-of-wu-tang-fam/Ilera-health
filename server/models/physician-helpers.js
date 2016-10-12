'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  signIn: (params, cb) => {
    let data = [params.email];
    const queryString = 'SELECT * \
      FROM physician \
      WHERE email=? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  realSignUp: (params, cb) => {
    console.log(params);
    // Post Request To: /api/physician/signup i think this is a guess
    let data = [params.first, params.last, params.email, params.password,
      params.betterUID];
    const queryString = "INSERT INTO physician \
      (first, last, email, password, betterDoctorUID) \
      VALUE (?,?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  signUp: (params, cb) => {
    console.log(params);
    module.exports.checkPhysicianBetDocUID(params, (error, results) => {
      if(results.length > 0 && results[0].email === null && results[0].password === null){
        module.exports.update_physician_info_on_SignUp(params, (err, updated)=>{
          if(err) console.log(err); 
          console.log("update_physician_info_on_SignUp",updated);
          module.exports.checkPhysician(params, (errata, result)=>{
            cb(errata, result);
          })
        });
      } else {
        if(error) console.log(error);
        module.exports.realSignUp(params, (error, result)=>{
          cb(error, result);
        });
      }
    })
  },

  // to see if the email is already taken when signing up
  checkPhysician: (params, cb) => {
    let data = [params.email];
    const queryString = "SELECT * \
      FROM physician \
      WHERE email=? \
      LIMIT 1";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkPhysicianBetDocUID: (params, cb) => {
    let data = [params.betterUID]
    const queryString = "SELECT * \
      FROM physician \
      WHERE betterDoctorUID=? \
      LIMIT 1"
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  getPhysicianInfoByID: (params, cb) => {
    let data = [params.uid];
    const queryString = 'SELECT * \
      FROM physician \
      WHERE id =? \
      LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_physician_info: (params, cb) => {
    console.log(params);
    module.exports.getPhysicianInfoByID(params, (err, physicianInfo)=> {

      let data = [(params.betterUID || physicianInfo[0].betterDoctorUID),
      params.title, (params.first || physicianInfo[0].first),
      (params.last || physicianInfo[0].last),
      params.phone_number, params.specialty];
      const queryString = 'UPDATE physician \
        SET betterDoctorUID=?, title=?, first=?, last=?, phone_number=?, \
        specialty=? \
        WHERE id='+ params.uid;
      db.query(queryString, data, (error, results) => cb(error, results) );
    })

  },

  update_physician_info_on_SignUp: (params, cb) => {
    console.log(params);
    let data = [params.first, params.last, params.email, params.password];
    const queryString = 'UPDATE physician \
      SET first=?, last=?, email=?, password=? \
      WHERE betterDoctorUID ="'+params.betterUID+'"';
    db.query(queryString, data, (error, results) => cb(error, results) );

  },

  update_password: (params, cb) => {
    let data = [params.password];
    const queryString ='UPDATE physician \
      SET password=? \
      WHERE id='+ params.uid;
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  getAllPhysicians: (cb) => {
    const queryString = 'SELECT * \
      FROM physician \
      LIMIT 50'
    db.query(queryString, (error, results) => cb(error, results) );
  },

  // added
  getSpecialtyPhysician: (params, cb) => {
    let data = [params.specialty];
    const queryString = 'SELECT * FROM physician \
      WHERE specialty=? \
      LIMIT 20'
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  checkBetterDoc: (params, cb) => {
    let data = [params.betterDocId];
    const queryString = "SELECT * \
      FROM physician \
      WHERE betterDoctorUID=?";
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  addBetterDocId: (params, cb) =>  {
    let data = [params.betterDocId, params.title, params.first,
      params.last, params.phone, params.image, params.specialty];
    const queryString = "INSERT INTO physician \
      (betterDoctorUID, title, first, last, phone_number, \
      photo_path, specialty) \
      VALUE (?,?,?,?,?,?,?)";
    db.query(queryString, data, (error, results) => cb(error, results) );
  }


  // (params, cb) => {
  //   let data = [params]
  //
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },


};

// physician table

// CREATE TABLE `physician` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `betterDoctorUID` VARCHAR(100) NULL,
//   `title` VARCHAR(10) NULL,
//   `first` VARCHAR(30) NULL,
//   `last` VARCHAR(30) NULL,
//   `email` VARCHAR(30) NULL,
//   `phone_number` VARCHAR(20) NULL,
//   `password` VARCHAR(300) NULL,
//   `photo_path` VARCHAR(300) NULL,
//   `specialty` VARCHAR(500) NULL,
//   PRIMARY KEY (`id`)
// );
