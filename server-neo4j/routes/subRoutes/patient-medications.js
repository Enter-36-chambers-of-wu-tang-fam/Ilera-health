const PatientMedications = require('../../controller/patient_medication.js');
// const authenticate = require('../../middlewares/authenticate');
// const physicianAuth = require('../../middlewares/physician_authenticate');

module.exports = app => {

  app.get('/api/patient/medications/:userid', PatientMedications.getAllMedsAndPhysicians);
  app.post('/api/patient/medications', PatientMedications.postMedication);

};
