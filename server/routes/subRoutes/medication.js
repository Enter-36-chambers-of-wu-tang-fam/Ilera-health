const Medication = require('../../controller/medication.js');

module.exports = app => {

  app.get('/api/patient/medications/:userid', Medication.getAll_patientMeds);
  
};
