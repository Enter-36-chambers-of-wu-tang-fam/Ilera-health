const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  signUp: (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE n.email={paremail} \
        RETURN n',
        {paremail:req.body.email })
      .then(data => {
        if(data.records.length <= 0){
          hashHelp.hashPassword(req.body.password)
          .then(hashed =>{
            req.body.password = hashed;
            gdb
              .run('CREATE(n:patient {first:{parfirst}, \
                last:{parlast}, email:{paremail}, password:{pass}}) \
                RETURN n',
                {parfirst:req.body.first,
                parlast:req.body.last, paremail:req.body.email,
                pass:req.body.password})
              .then(data=>{
                console.log(data);
                gdb.close();
                res.json({
                  properties: data.records[0]._fields[0].properties,
                  uid: data.records[0]._fields[0].identity.low
                });
              })

          })
      }
    })
    .catch(err=>
      // res.status(409).send("The email address you specified is already in use.");
      console.error(err))
  },

  signIn: (req, res) => {
    // var passwordz = req.body.password;
    gdb
      .run('MATCH (n:patient) \
        WHERE n.email={paremail} \
        RETURN n',
        {paremail:req.body.email })
      .then(data =>{
        console.log(data, data.records[0]._fields[0].properties.email);
        bcrypt.compare(req.body.password, data.records[0]._fields[0].properties.password, (error, result) => {
          if(result){
            var sess = req.session;
            sess.email = data.records[0]._fields[0].properties.email;
            sess.patient = data.records[0]._fields[0].identity.low;
            module.exports.sess = sess;
            gdb.close();
            res.json({
              properties: data.records[0]._fields[0].properties,
              uid: data.records[0]._fields[0].identity.low
            });
          }
          // else {
          //   res.status(401).send("That email and/or password was not found");
          // }
        })
      })
      .catch(err=>console.error(err))


  },

  put_init_form: (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE id(n)={parid} \
        SET n.first={parfirst}, \
        n.last={parlast}, n.date_of_birth={pardob}, \
        n.address={para}, n.city={parcity}, n.state={parstate}, \
        n.zip={parzip}, n.email={paremail}, n.phone_number={parpn}, \
        n.photo_path={parpp}, n.weight={parweight}, n.height={parheight}, \
        n.blood_type={parbt}',
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
      .catch(err=>console.error(err))

  },

  getPatientInfoByID: (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE id(n)={parid} \
        RETURN n',
        {parid:req.body.uid})
      .then(data=>{
        console.log(data.records[0]._fields[0].properties);
        gdb.close();
        res.json({
          properties: data.records[0]._fields[0].properties,
          uid: data.records[0]._fields[0].identity.low
        });
      })
      .catch(err=>console.error(err))
  },

  initform_patient_health:  (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE id(n)={parid} \
        SET n.gender={gender}, n.procedures={procedures}, \
        n.address={para}, \
        n.state={parstate}, n.conditions={conditions}, \
        n.medications={medications}, n.allergies={allergies}, \
        n.weight={parweight}, n.height={parheight}, n.blood_type={parbt}',
        {parid:req.body.uid, gender:req.body.gender,
          procedures:req.body.procedures, para:req.body.address,
          parstate:req.body.state, conditions:req.body.conditions,
          medications:req.body.medications, allergies:req.body.allergies,
          parweight:req.body.weight, parheight:req.body.height,
          parbt:req.body.blood_type })
      .then(data=>{
        console.log(data.records[0]._fields[0].properties);
        gdb.close();
        res.json({
          properties: data.records[0]._fields[0].properties,
          uid: data.records[0]._fields[0].identity.low
        });
      })
      .catch(err =>console.error(err))
  },

  initform_patient_contact: (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE id(n)={parid} \
        SET n.address={para}, \
        n.state={parstate}, n.city={city}, \
        n.zip={zip}, n.primary_phone_number={primary_phone_number}, \
        n.secondary_phone_number={secondary_phone_number}',
        {parid:req.body.uid, para:req.body.address,
          parstate:req.body.state, city:req.body.city,
          zip:req.body.zip, primary_phone_number:req.body.primary_phone_number,
          secondary_phone_number:req.body.secondary_phone_number })
      .then(data=>{
        console.log(data.records[0]._fields[0].properties);
        gdb.close();
        res.json({
          properties: data.records[0]._fields[0].properties,
          uid: data.records[0]._fields[0].identity.low
        });
      })
      .catch(err =>console.error(err))
  },

  put_photo: (req, res) => {
    gdb
      .run('MATCH (n:patient) \
        WHERE id(n)={parid} \
        SET n.photo_path={parpp}, \
        RETURN n.photo_path',
        {parid:req.body.uid,
        parpp:req.body.photo_path })
      .then(data=>{
        console.log(data.records[0]._fields[0].properties);
        gdb.close();
        res.json({
          photo_path: data.records[0]._fields[0].photo_path,
          uid: data.records[0]._fields[0].identity.low
        });
      })
      .catch(err=>console.error(err))

  }

};


// controller

// `id` INTEGER NOT NULL AUTO_INCREMENT,
// `first` VARCHAR(30) NULL DEFAULT NULL,
// `last` VARCHAR(30) NULL DEFAULT NULL,
// `email` VARCHAR(30) NOT NULL,
// `password` VARCHAR(300) NULL DEFAULT NULL,
// `pin` INTEGER(4) NULL DEFAULT NULL,
// `date_of_birth` DATE NULL DEFAULT NULL,
// `address` VARCHAR(60) NULL DEFAULT NULL,
// `city` VARCHAR(60) NULL DEFAULT NULL,
// `state` VARCHAR(2) NULL DEFAULT NULL,
// `zip` VARCHAR(10) NULL DEFAULT NULL,
// `phone_number` VARCHAR(20) NULL DEFAULT NULL,
// `weight` INTEGER NULL DEFAULT NULL,
// `height` INTEGER NULL DEFAULT NULL,
// `blood_type` VARCHAR(3) NULL DEFAULT NULL,
// `photo_path` VARCHAR(200) NULL DEFAULT NULL,
// PRIMARY KEY (`id`)
