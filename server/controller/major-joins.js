'use strict'

const MJ = require('../models/major-joins-helpers.js');

module.exports = {


  getAll: (req, res) => {
    MJ.getAll_patientInfo(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

  // (req, res) => {
  //   MJ.getAll_patient_medication(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
