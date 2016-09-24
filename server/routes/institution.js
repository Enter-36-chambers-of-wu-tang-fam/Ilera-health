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

  get_patient_physician_relation: (req, res) => {
    Institution.patient_physician_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
