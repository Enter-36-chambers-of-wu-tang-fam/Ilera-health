'use strict'

const Medication = require('../models/medication-helpers.js');
const Physician = require("../models/physician-helpers.js");
// this file is a duplicate

module.exports = {


  postMedication: (req, res) => {
    Medication.new_medication(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_patientMeds: (req, res) => {
    Medication.getAll_patient_medication(req.body, (err,data)=>{
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
