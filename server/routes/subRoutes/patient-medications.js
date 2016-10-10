const PatientMedications = require('../../controller/patient_medication.js');


module.exports = app => {

  // app.get('/api/patient/medications/:userid', PatientMedications.getAllpatientMeds);
  app.get('/api/patient/medications/:userid', PatientMedications.getAllMedsAndPhysicians);
  app.post('/api/patient/medications', PatientMedications.postMedication);

};
