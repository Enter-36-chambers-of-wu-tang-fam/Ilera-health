'use strict'

const EmergencyContact = require('.././models/emergency_contact.js');
const Patient = require("../models/patient-helpers.js");



module.exports = {

  put_emer_contact: (req, res) => {
    EmergencyContact.update_emergency_contact_form(req.body, (err, data)=>{
      if(err) console.log(err);
        res.json(data);
      })
  },

  get_emergencyContact: (req, res) =>{
    EmergencyContact.get_emergency_contact(req.params, (err, data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  },

  post_emer_contact: (req, res) => {
    EmergencyContact.emergency_contact_form(req.body, (err, data)=>{
      if(err) console.log(err);
        res.json(data);
    })
  }

};
