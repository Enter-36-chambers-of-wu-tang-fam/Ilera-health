const gdb = require('../graphDb/graphConnect.js').graphdb;

// CREATE TABLE `appointment` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `date` DATE NULL DEFAULT NULL,
//   `time` TIME NULL DEFAULT NULL,
//   `notes` VARCHAR(10000) NULL DEFAULT NULL,
//   `id_physician` INTEGER DEFAULT NULL,
//   `id_patient` INTEGER DEFAULT NULL,
//   `id_institution` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

module.exports = {


  postAppointment: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  getOne_AppointmentByPat_id: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  getAll_appointmentByPhY_id: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  updateAppointment: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  cancelAppointment: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  }




};
