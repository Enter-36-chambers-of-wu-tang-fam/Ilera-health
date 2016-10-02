const gdb = require('../graphDb/graphConnect.js').graphdb;

// CREATE TABLE `patient_physician` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `id_physician` INTEGER DEFAULT NULL,
//   `id_patient` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

module.exports = {

  getPatientPhysicianRelation: (req, res) => {
    gdb
      .run()
      .then()
      .catch()
  },

  // added
  createPatientPhysicianRelation: (req, res) => {
    gdb
      .run()
      .then()
      .catch()
  },

  getAll_patients_of_Physician: (req, res) => {
    gdb
      .run()
      .then()
      .catch()
  },

  getAll_physicians_of_patient: (req, res) => {
    gdb
      .run()
      .then()
      .catch()
  }


};
