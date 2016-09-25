'use strict'

const Institution = require('../../db/controller/institution-helpers.js');

module.exports = {

  postAppointment: (req, res) => {
    Institution.make_appointment(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

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
  getOneAppointmentByPatId: (req, res) => {
    Institution.get_one_appointment_by_pat_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  getOneAppointmentByPhyId: (req, res) => {
    Institution.get_one_appointment_by_phY_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  updateAppointment: (req, res) => {
    Institution.update_appointment(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  cancelAppointment: (req, res) => {
    Institution.cancel_appointment(req.body, (err,data)=>{
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
