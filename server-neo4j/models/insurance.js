const gdb = require('../graphDb/graphConnect.js').graphdb;

  // CREATE TABLE `insurance` (
  //   `id` INTEGER NOT NULL AUTO_INCREMENT,
  //   `insurer` VARCHAR(255) NULL,
  //   `type` VARCHAR(255) NULL,
  //   `network` VARCHAR(255) NULL,
  //   `uid` VARCHAR(255) NULL,
  //   PRIMARY KEY (`id`)
  // );

module.exports = {


  getAllInsurance: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  },

  get_specificInsurance: (req, res) => {
    gdb
      .run()
      .then()
      .catch()

  }




};
