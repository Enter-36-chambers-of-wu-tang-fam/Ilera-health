'use strict'

const Institution = require('../controller/institution-helpers.js');

module.exports = {


  postMedication: (req, res) => {
    Institution.new_medication(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getPatientPhysicianRelation: (req, res) => {
    Institution.patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  createPatientPhysicianRelation: (req, res) => {
    Institution.create_patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }
  // (req, res) => {
  //   Institution.patient_physician_relation(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // }

};
