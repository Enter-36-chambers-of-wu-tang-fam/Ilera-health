const Patient = require('../../controller/patient.js');
const authenticate = require('../../middlewares/authenticate');

module.exports = app => {

  // Patient
  app.post('/api/patient/signin', Patient.signIn);

  //not for now but this will get all of the patient info eventually we are still in stage 1
  // app.get('/api/patient/dashboard', Patient.get_patient_info);
  app.get('/api/patient/:userid', authenticate, Patient.get_patient_info);

  // Post Request to: api/patient/signup  =>   { Patient Table}
  app.post('/api/patient/signup', Patient.signUp);

  // Post request to: /api/patient/background => { Patient }
  app.put('/api/patient/background', authenticate, Patient.put_init_form);
  app.put('/api/patient/health', authenticate, Patient.put_init_form_health);
  app.put('/api/patient/password/update', Patient.put_password);
  app.put('/api/patient/photo/update', authenticate, Patient.put_photo);

  app.get('/api/patient/getRecords/:uid', authenticate, Patient.get_records)
  app.post('/api/patient/deleteRecords/:uid', authenticate, Patient.delete_record)

  app.post('/api/patient/logout', Patient.logout);

};
