'use strict'

const EmergencyContact = require('.././models/emergency_contact.js');
const Patient = require("../models/patient-helpers.js");



module.exports = {

  put_emer_contact: (req, res) => {
    EmergencyContact.update_emergency_contact_form(req.body, (err, edata)=>{
      if(err) console.log(err);
      Patient.initform_patient_contact(req.body, (err, data)=>{
        if(err) console.log(err)
        res.json({
          contacts: edata,
          patientContact: data
        });
      })
    })
  },

  get_emergencyContact: (req, res) =>{
    EmergencyContact.get_emergency_contact(req.body, (err, data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  },

  post_emer_contact: (req, res) => {
    EmergencyContact.emergency_contact_form(req.body, (err,edata)=>{
      if(err) console.log(err);
      Patient.initform_patient_contact(req.body, (err,data)=>{
        if(err) console.log(err);
        res.json({
          contacts: edata,
          patientContact: data
        });
      });
    });

  }

};
