'use strict'

const Relation = require('../controller/relation-patient_physician-helpers.js');

module.exports = {

  getPatientPhysicianRelation: (req, res) => {
    Relation.patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  createPatientPhysicianRelation: (req, res) => {
    Relation.create_patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

  // (req, res) => {
  //   Medication.getAll_patient_medication(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
