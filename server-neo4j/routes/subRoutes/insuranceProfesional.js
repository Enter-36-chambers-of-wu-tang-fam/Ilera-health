const InsuranceProfesional = require('../../controller/insurance_professional.js');

module.exports = app => {
  // InsuranceProfesional
  app.get('/api/professional', InsuranceProfesional.signIn);
  app.post('/api/professional', InsuranceProfesional.signUp);
  app.put('/api/professional', InsuranceProfesional.put_initForm);
  app.put('/api/professional', InsuranceProfesional.put_password);
  app.post('/api/professional/logout', InsuranceProfesional.logout);
  
};
