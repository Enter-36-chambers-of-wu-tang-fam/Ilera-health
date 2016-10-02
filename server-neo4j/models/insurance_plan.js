const gdb = require('../graphDb/graphConnect.js').graphdb;

// CREATE TABLE `insurance_plan` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `plan` VARCHAR(100) NULL,
//   `policy_number` VARCHAR(100) NULL DEFAULT NULL,
//   `member_id` VARCHAR(30) NULL,
//   `payer_id` VARCHAR(20) NULL,
//   `id_patient` INTEGER DEFAULT NULL,
//   `id_Insurance_company` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

module.exports = {


  post_initInsurance_plan: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  getOne_by_id: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  getOne_patientPlan: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  getAll_by_InsuranceCompanyId: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  update_insurancePlan: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  }




};
