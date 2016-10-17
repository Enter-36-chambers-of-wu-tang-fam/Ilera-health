'use strict'

const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Patient = require("../models/patient-helpers.js");
// const jwt = require("jsonwebtoken");
// const config = require("../config");

module.exports = {

  signIn: (req, res) => {
    Patient.signIn(req.body, (error, data) => {
      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          if(result){
            // const token =jwt.sign({
            //   id: data[0].id,
            // }, config.jwtSecret)
            res.json({
              id: data[0].id,
              email: data[0].email,
              first: data[0].first,
              last: data[0].last,
              photo_path: data[0].photo_path
            });
          } else{
            res.status(401).send("That email and/or password was not found");
          }
        })
      } else {
        res.status(401).send("That email and/or password was not found");
      }
    })
  },

  signUp: (req, res) => {
    Patient.checkPatient(req.body,(error,data)=> {

      if(error){ console.log(error);}

      if(data){
        res.status(409).send("The email address you specified is already in use.");
      } else {
        hashHelp.hashPassword(req.body.password)
        .then(hashed=>{
          req.body.password = hashed;

          Patient.signUp(req.body, (error, data) => {
    
            if(error) console.log(error);
            
            // const token = jwt.sign({
            //   id: data.insertId,
            // }, config.jwtSecret)

            res.json({
              data: data,
              first: req.body.first,
              last: req.body.last,
              email: req.body.email,
              id: data.insertId
            })
            // res.json(data.insertId);
          });
        })
      }
    });
  },
  // change to put
  // hash new password and do not hash if it is the same password

  put_init_form: (req, res) => {
    console.log("INFO", req.body)
    Patient.initform_patient(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  put_init_form_health: (req, res) => {
    console.log("INFO", req.body)
    Patient.initform_patient_health(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  put_password: (req, res) => {
    if(req.body.newPassword){
      hashHelp.hashPassword(req.body.password)
      .then( hash => {
        delete req.body.newPassword;
        req.body.password = hash;
        Patient.update_password(req.body, (error, data) => {
          if(error) console.log(error);
          res.json(data);
        });
      });
    } else {
      Patient.update_password(req.body, (error, data) => {
        if(error) console.log(error);
        res.json(data);
      });
    }
  },

put_photo: (req,res) => {
  Patient.update_photo(req.body, (error,data) =>{
    if(error) console.log(error);
    res.json(data);
  })
},

  post_insurance_info: (req, res) => {
    Patient.init_insurance(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  get_patient_info: (req, res) => {
    Patient.get_patient(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  get_records: (req, res) => {
    Patient.get_records(req.params, (err,data) => {
      if(err) console.log(err);
      res.json(data);
    })
  },

  delete_record: (req, res) => {
    Patient.delete_record(req, (err,data) => {
      if(err) console.log(err);
      res.json(data);
    })
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("Logout complete");
  }
  //
  // (req, res) => {
  //   Patient.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
};
