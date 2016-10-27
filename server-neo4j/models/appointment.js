const gdb = require('../graphDb/graphConnect.js').graphdb;


module.exports = {


  postAppointment: (req, res) => {
    gdb
      .run('CREATE (a:appointment{date:{date}, time:{time}, \
        notes:{notes}}) \
        return a', {date:req.body.date, time: req.body.time,
        notes:req.body.notes})
        gdb.close();
      .then(infoId=>{
        console.log(infoId);
        gdb
          .run('MATCH (a:appointment{id:{appointmentID}}), \
            (n:patient {id:{patientID}}) \
            CREATE (n)-[ma:medicalAppointment]->(a) \
            RETURN a',
            {appointmentID:infoId.id, patientID:req.body.uid})
          gdb.close();
          .then(aid => {
            console.log(aid);
            gdb
              .run('MATCH (a:appointment{id:{appointmentID}}), \
                (py:physician {id:{physicianID}}) \
                CREATE (py)-[ma:medicalAppointment]->(a) \
                RETURN a',
                {appointmentID:aid.id, physicianID:req.body.id_physician})
              .then(data => {
                gdb.close();
                res.json(data.records[0]._fields[0]);
              })

          })
      })
      .catch(console.error)

  },

  getOne_AppointmentByPat_id: (req, res) => {
    gdb
      .run('MATCH (a:appointment{id:{appointmentID}}) \
        RETURN a',
        {appointmentID:infoId.id, patientID:req.body.uid})
      .then(data => {
        gdb.close();
        res.json(data.records[0]._fields[0]);
      })
      .catch(console.error)

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

// MATCH (py:physician {email:'yara@g.com'}), (n:patient {email:'jojojann@gmaol.com'})
// CREATE (n)-[r:ppRelation]->(py)
// RETURN r

// MATCH (cust:Customer),(cc:CreditCard)
// CREATE (cust)-[r:DO_SHOPPING_WITH{shopdate:"12/12/2014",price:55000}]->(cc)
// RETURN r
// MATCH (py:physician {email:'yara@g.com'}), (n:patient {email:'henrey@g.com'})
// CREATE (n)-[r:appointment{date:"12/12/2017",time:"5:00am",notes:"upset stomach"}]->(py)
// RETURN r
// MATCH (a:appointment {email:'yara@g.com'}), (n:patient {email:'henrey@g.com'})
// CREATE (n)-[r:appointment{date:"12/12/2017",time:"5:00am",notes:"upset stomach"}]->(py)
// RETURN r
