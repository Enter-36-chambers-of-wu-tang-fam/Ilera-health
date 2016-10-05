const PatientMedications = require('../../controller/patient_medication.js');


module.exports = app => {

  app.get('/api/patient/medications/:userid', PatientMedications.getAllpatientMeds);

};
