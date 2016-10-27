const gdb = require('../graphDb/graphConnect.js').graphdb;


module.exports = {
  getOne_healthLog: (req, res) => {
    gdb
      .run('MATCH (hl:health_log) \
        WHERE id(hl)={parid} \
        RETURN hl',
        {parid:req.body.id })
      .then(data => {
        console.log(data);
        gdb.close();
        res.json(data)
      })
      .catch(err=>{
        console.error(err);
        res.status(409).send("The email address you specified is already in use.");
      })
  },

  add_healthLog: (req, res) => {
    var passwordz = req.body.password;
    gdb
      .run('CREATE (hl:health_log {physician_date:{date}}, \
        physician_notes:{pynotes}, physician_photo_path:{pyphoto}, \
        RETURN hl', {date:req.body.physician_date,
        pynotes:req.body.physician_notes, pyphoto:req.body.physician_photo_path })
      .then(infoId=>{
        console.log(infoId);
        gdb
          .run('MATCH (hl:health_log{id:{appointmentID}}), \
            (n:patient {id:{patientID}}) \
            CREATE (n)-[ma:medicalAppointment]->(hl) \
            RETURN hl',
          {healthlogID:infoId.id, patientID:req.body.id_patient})
          .then(hlid => {
            gdb.close()
            console.log(hlid);
            gdb
              .run('MATCH (a:appointment{id:{appointmentID}}), \
                (py:physician {id:{physicianID}}) \
                CREATE (py)-[ma:medicalAppointment]->(a) \
                RETURN a',
              {healthlogID:hlid.id, physicianID:req.body.uid})
              .then(data => {
                gdb.close();
                res.json(data);
              })

          })
      })
      .catch(console.error)
  },

  patient_update_healthLog: (req, res) => {
    gdb
      .run('MATCH (n:health_log) \
        WHERE id(n)={parid} \
        SET n.first={parfirst}, \
        n.last={parlast}, n.date_of_birth={pardob}, \
        n.address={para}, n.city={parcity}, n.state={parstate}, \
        n.zip={parzip}, n.email={paremail}, n.phone_number={parpn}, \
        n.photo_path={parpp}, n.weight={parweight}, \
        n.height={parheight}, n.blood_type={parbt}',
        {parid:req.body.uid, parfirst:req.body.first, parlast:req.body.last,
          pardob:req.body.date_of_birth, para:req.body.address,
          parcity:req.body.city, parstate:req.body.state, parzip:req.body.zip,
          paremail:req.body.email, parpn:req.body.phone_number,
          parpp:req.body.photo_path, parweight:req.body.weight,
          parheight:req.body.height, parbt:req.body.blood_type })
      .then(data=>{
        console.log(data.records[0]._fields[0].properties);
        gdb.close();
        res.json({
          properties: data.records[0]._fields[0].properties,
          uid: data.records[0]._fields[0].identity.low
        });
      })
      .catch(err =>{
        console.log(err);
      })

  }

  // getOne_healthLog: (req, res){
  //   gdb
  //     .run()
  //     .then()
  //     .catch()
  // },

  // getAll_healthLogsBy_patientPhysician_id: (req, res){
  //   gdb
  //     .run()
  //     .then()
  //     .catch()
  // },

  // physician_update_healthLog: (req, res){
  //   gdb
  //     .run()
  //     .then()
  //     .catch()
  // }


};



// CREATE TABLE `health_log` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `physician_date` DATE NULL DEFAULT NULL,
//   `physician_notes` VARCHAR(10000) NULL DEFAULT NULL,
//   `physician_photo_path` VARCHAR(300) NULL,
//   `patient_date` DATE NULL DEFAULT NULL,
//   `patient_note` VARCHAR(10000) NULL DEFAULT NULL,
//   `patient_photo_path` VARCHAR(300) NULL,
//   `id_physician` INTEGER DEFAULT NULL,
//   `id_patient` INTEGER DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );
