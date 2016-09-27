'use strict'

const Professional = require('../controller/insurance_company_professional-helper.js');

module.exports = {

  signUp: (req, res) => {
    Professional.signUp(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  signIn: (req, res) => {
    Professional.signIn(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }
};
