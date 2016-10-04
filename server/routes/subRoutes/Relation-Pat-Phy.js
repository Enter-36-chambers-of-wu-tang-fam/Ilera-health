const Relation_PatPhy = require('../../controller/relation-patient_physician.js');

module.exports = app => {

  app.get('/api/patient/:userid/physicians', Relation_PatPhy.test_getAll_physicians_of_patient);
  // app.get('/api/patient/:userid/physicians', Relation_PatPhy.getAll_physicians_of_patient);
  app.get('/api/relation', Relation_PatPhy.getPatientPhysicianRelation);
  app.get('/api/physician/:userid/patients', Relation_PatPhy.getAll_patients_of_Physician);
  app.post('/api/relation/create', Relation_PatPhy.createPatientPhysicianRelation);
  app.delete('/api/relation/delete', Relation_PatPhy.deletePatientPhysicianRelation);

};
