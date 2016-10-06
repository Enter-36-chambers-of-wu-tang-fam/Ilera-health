const InsurancePlan = require('../../controller/insurance_plan.js');

module.exports = app => {

  app.post('/api/patient/insurance', InsurancePlan.post_initInsurance_plan);

}
