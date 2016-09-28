const InsurancePlan = require("../models/insurance_plan-helpers.js");

module.exports = {

  post_initInsurance_plan: (req, res) => {
    InsurancePlan.init_insurance_plan(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getOne_by_id: (req, res) => {
    InsurancePlan.get_one_by_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getOne_patientPlan: (req, res) => {
    InsurancePlan.get_one_patientPlan(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_by_InsuranceCompanyId: (req, res) => {
    InsurancePlan.get_all_by_id_Insurance_company(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  update_insurancePlan: (req, res) => {
    InsurancePlan.update_insurance_plan(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
