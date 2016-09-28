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
  },

  getAll_patients_of_Physician: (req, res) => {
    Relation.get_all_patients_of_Physician(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_physicians_of_patient: (req, res) => {
    Relation.get_all_physicians_of_patient(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }
  // (req, res) => {
  //   Relation.getAll_patient_medication(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
