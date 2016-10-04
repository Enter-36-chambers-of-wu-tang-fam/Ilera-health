const Patient = require('../../controller/patient.js');

module.exports = app => {

  // Patient
  app.post('/api/patient/signin', Patient.signIn);
  // Patient major join
  // app.get('/api/patient/something', Mj.getAll);
  //not for now but this will get all of the patient info eventually we are still in stage 1
  // app.get('/api/patient/dashboard', Patient.get_patient_info);
  app.get('/api/patient/:userid', Patient.get_patient_info);

  // Post Request to: api/patient/signup  =>   { Patient Table}
  app.post('/api/patient/signup', Patient.signUp);

  // Post request to: /api/patient/background => { Patient }
  app.put('/api/patient/background', Patient.put_init_form);
  app.put('/api/patient/health', Patient.put_init_form_health);
  app.put('/api/patient/password/update', Patient.put_password);
  // Post request to: /api/patient/emergency_contacts => { Emergency Table }
  app.post('/api/patient/contact', Patient.post_emer_contact);


  app.post('/api/patient/logout', Patient.logout);

};
