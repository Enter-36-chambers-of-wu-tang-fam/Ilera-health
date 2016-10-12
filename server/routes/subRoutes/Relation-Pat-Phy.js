const Relation_PatPhy = require('../../controller/relation-patient_physician.js');
const authenticate = require('../../middlewares/authenticate');
const physicianAuth = require('../../middlewares/physician_authenticate');


module.exports = app => {

  app.get('/api/patient/:userid/physicians', authenticate, Relation_PatPhy.test_getAll_physicians_of_patient);
  // app.get('/api/patient/:userid/physicians', Relation_PatPhy.getAll_physicians_of_patient);
  app.post('/api/relation', authenticate, Relation_PatPhy.getPatientPhysicianRelation);
  app.get('/api/physician/:userid/patients', physicianAuth, Relation_PatPhy.getAll_patients_of_Physician);
  app.post('/api/relation/create', authenticate, Relation_PatPhy.createPatientPhysicianRelation);
  app.post('/api/relation/delete', authenticate, Relation_PatPhy.deletePatientPhysicianRelation); //delete wasn't working with req.body'

};
