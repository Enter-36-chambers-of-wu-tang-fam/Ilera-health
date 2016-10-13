const Relation_PatPhy = require('../../controller/relation-patient_physician.js');
// const authenticate = require('../../middlewares/authenticate');
// const physicianAuth = require('../../middlewares/physician_authenticate');


module.exports = app => {

  app.get('/api/patient/:userid/physicians', Relation_PatPhy.test_getAll_physicians_of_patient);
  app.post('/api/relation', Relation_PatPhy.getPatientPhysicianRelation);
  app.get('/api/physician/:userid/patients', Relation_PatPhy.getAll_patients_of_Physician);
  app.post('/api/relation/create', Relation_PatPhy.createPatientPhysicianRelation);
  app.post('/api/relation/delete', Relation_PatPhy.deletePatientPhysicianRelation); //delete wasn't working with req.body'

};
