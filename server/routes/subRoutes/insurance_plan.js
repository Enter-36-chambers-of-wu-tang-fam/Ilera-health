const InsurancePlan = require('../../controller/insurance_plan.js');

module.exports = app => {

  app.post('/api/patient/insurance', InsurancePlan.post_initInsurance_plan);
  app.put('/api/patient/insurance/update', InsurancePlan.put_InsurancePlan);
  app.get('/api/patient/insurance/:userid', InsurancePlan.getOne_patientPlan);

}
