const gdb = require('../graphDb/graphConnect.js').graphdb;


module.exports = {

  createPatientPhysicianRelation: (req, res) => {
    gdb
      .run('MATCH (py:physician {id:{phyId}}), (n:patient {id:{patId}}) \
      CREATE (n)-[r:ppRelation]->(py) \
      RETURN r', {phyId:req.body.id_physician, patId:req.body.id_patient})
      .then(info => {
        .run('MATCH (n:patient {id:{patId}}), (py:physician {id:{phyId}}) \
        CREATE (py)-[r:ppRelation]->(n) \
        RETURN r', {patId:req.body.id_patient, phyId:req.body.id_physician})
        .then(data => {
          console.log(data.records[0]._fields[0]);
          gdb.close();
          res.json(data.records[0]._fields[0])
        })
      })
      .catch(console.error)
  },

  getPatientPhysicianRelation: (req, res) => {
    gdb
    .run()
    .then()
    .catch()
  },

  getAll_patients_of_Physician: (req, res) => {
    gdb
      .run('MATCH (n)-[r:ppRelation]->(py{betterDoctorUID={BdUId}}) \
        RETURN py, n',
        {BdUId:req.body.betterDoctorUID})
      .then(data => {
        console.log(data.records[0]._fields[0]);
        gdb.close();
        res.json(data.records[0]._fields[0])
      })
      .catch(console.error)
  },

  getAll_physicians_of_patient: (req, res) => {
    gdb
      .run('MATCH (py)-[r:ppRelation]->(n{email={email}}) \
        RETURN py, n',
        {email:req.body.email})
      .then(data => {
        console.log(data.records[0]._fields[0]);
        gdb.close();
        res.json(data.records[0]._fields[0])
      })
      .catch(console.error)
  }


};


// MATCH (py:physician {email:'yara@g.com'}), (n:patient {email:'jojojann@gmaol.com'})
// CREATE (n)-[r:ppRelation]->(py)
// RETURN r

// CREATE TABLE `patient_physician` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `id_physician` INTEGER DEFAULT NULL,
//   `id_patient` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );
