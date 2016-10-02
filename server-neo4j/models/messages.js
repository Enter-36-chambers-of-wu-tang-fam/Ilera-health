const gdb = require('../graphDb/graphConnect.js').graphdb;

module.exports = {

  getAllMessages_pat_from_phy: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  },
  
  getAllMessages_phy_from_pat: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  },

  getOneMessage: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  },

  postMessage: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  },

  deleteOneMessage: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  },

  editOneMessage: (req, res)=>{
    gdb
    .run()
    .then()
    .catch()
  }
};
// CREATE TABLE `messages` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `direct_message` VARCHAR(10000) NULL DEFAULT NULL,
//   `date` TIMESTAMP NULL DEFAULT NULL,
//   `sender_id` INTEGER NULL,
//   `receiver_id` INTEGER NULL,
//   `sender_type` VARCHAR(300) NULL,
//   `receiver_type` VARCHAR(300) NULL,
//   PRIMARY KEY (`id`)
// );
