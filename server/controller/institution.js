'use strict'

const Institution = require('../models/institution-helpers.js');

module.exports = {

  getAll_physician_institutions: (req, res) => {
    Institution.get_all_physician_institutions(req.body, (err,data)=>{
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
