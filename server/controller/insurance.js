'use strict'

const Insurance = require('../models/insurance-helpers.js');

module.exports = {


  getAllInsurance: (req, res) => {
    Insurance.get_insurance(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  get_specificInsurance: (req, res) => {
    Insurance.get_specific_insurance(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }


  // (req, res) => {
  //   Insurance.getAll_patient_medication(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
