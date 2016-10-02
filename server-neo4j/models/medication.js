const gdb = require('../graphDb/graphConnect.js').graphdb;

// CREATE TABLE `medication` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `drug_name` VARCHAR(100) NULL DEFAULT NULL,
//   `details` VARCHAR(1000) NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );
module.exports = {

  postMedication: (req, res)=>{
    gdb
      .run()
      .then()
      .catch()
  },

  getAll_patientMeds: (req, res)=>{
    gdb
      .run()
      .then()
      .catch()
  }

};
