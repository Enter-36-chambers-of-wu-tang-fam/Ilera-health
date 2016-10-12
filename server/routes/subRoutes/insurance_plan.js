const InsurancePlan = require('../../controller/insurance_plan.js');
const authenticate = require('../../middlewares/authenticate');

module.exports = app => {

  app.post('/api/patient/insurance', authenticate, InsurancePlan.post_initInsurance_plan);
  app.put('/api/patient/insurance/update', authenticate, InsurancePlan.put_InsurancePlan);
  app.get('/api/patient/insurance/:userid', authenticate, InsurancePlan.getOne_patientPlan);

}
