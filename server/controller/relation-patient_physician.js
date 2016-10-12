'use strict'

const Relation = require('../models/relation-patient_physician-helpers.js');

module.exports = {

  getPatientPhysicianRelation: (req, res) => {
    Relation.get_patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },
  // new way checks for relation
  createPatientPhysicianRelation: (req, res) => {
    Relation.get_patient_physician_relation(req.body,(error,data) => {
      if(error){
        console.log(error);
      }
      if(data.length > 0){
        res.status(409).send("This Relation already exists try rtfd Son!");
      } else {
        Relation.create_patient_physician_relation(req.body, (err,data)=>{
          if(err) console.log(err);
          res.json(data);
        })
      }
    });
  },
  // old Way
  // createPatientPhysicianRelation: (req, res) => {
  //   Relation.create_patient_physician_relation(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  getAll_patients_of_Physician: (req, res) => {
    Relation.get_all_patients_of_Physician(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_physicians_of_patient: (req, res) => {
    Relation.get_all_physicians_of_patient(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  test_getAll_physicians_of_patient: (req, res) => {
    Relation.test_get_all_physicians_of_patient(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  deletePatientPhysicianRelation:(req, res) => {
    Relation.delete_PatientPhysicianRelation(req.body, (err,data)=>{
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
