const gdb = require('../graphDb/graphConnect.js').graphdb;

// CREATE TABLE `institution` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `inst_name` VARCHAR(30) NULL DEFAULT NULL,
//   `type` VARCHAR(25) NULL DEFAULT NULL,
//   `description` VARCHAR(300) NULL DEFAULT NULL,
//   `rating` INTEGER(5) NULL DEFAULT NULL,
//   `phone_number` VARCHAR(20) NULL DEFAULT NULL,
//   `address` VARCHAR(300) NULL,
//   `city` VARCHAR(50) NULL,
//   `state` VARCHAR(3) NULL,
//   `zip` VARCHAR(10) NULL,
//   `email` VARCHAR(100) NULL,
//   PRIMARY KEY (`id`)
// );

module.exports = {

  // MATCH (n)-[r:ppRelation]->(py{first: "neekon"}) return py, n
  getAll_physician_institutions: (req, res) => {
    gdb
      .run('MATCH (py)-[r:pyiRelation]->(in{inst_name:{inst_name}}) \
        RETURN py, in',
        {inst_name:req.body.inst_name})
      .then(data => {
        console.log(data.records[0]._fields[0]);
        gdb.close();
        res.json(data.records[0]._fields[0])
      })
      .catch(console.error)

  }


};
