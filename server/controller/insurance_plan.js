const InsurancePlan = require("../models/insurance_plan-helpers.js");

module.exports = {

  post_initInsurance_plan: (req, res) => {
    InsurancePlan.post_initInsurance_plan(req.body, (err,data)=>{
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
    InsurancePlan.get_one_patientPlan(req.params, (err,data)=>{
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

  put_InsurancePlan: (req, res) => {
    InsurancePlan.put_Insurance_plan(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },
  
  // no loner in use because the schema was updated
  update_insurancePlan: (req, res) => {
    InsurancePlan.update_insurance_plan(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
