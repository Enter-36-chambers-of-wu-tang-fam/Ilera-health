const Physician = require('../../controller/physician.js')
// const physicianAuth = require('../../middlewares/physician_authenticate');

module.exports = app => {

  // Physician
  // Post Request To: /api/physician/signup i think this is a guess
  app.post('/api/physician/signup', Physician.signUp);
  app.post('/api/physician/signin', Physician.signIn);
  app.get('/api/patient/getallphy', Physician.getAll_Physicians);
  app.get('/api/physician/:uid', Physician.getSinglePhysician);
  app.post('/api/patient/getallphy/specialty', Physician.getAll_SpecialtyPhysician);
  app.put('/api/physician/background', Physician.put_init_form);
  app.put('/api/physician/password/update', Physician.put_password);

  app.post('/api/physician/addbetterDoc', Physician.addBetterDoc);
  app.post('/api/physician/checkbetterDoc', Physician.checkBetterDoc);
  
  app.post('/api/physician/logout', Physician.logout);
  
};
