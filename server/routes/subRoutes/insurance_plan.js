const InsurancePlan = require('../../controller/institution.js');

module.exports = app => {

  app.post('/api/patient/insurance', InsurancePlan.post_initInsurance_plan);

}
