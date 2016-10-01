const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  signUp: (req, res) => {
    gdb
    .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n', {paremail:req.body.email })
    .then(data => {
      if(data.records.length <= 0){
        hashHelp.hashPassword(req.body.password)
        .then(hashed =>{
          req.body.password = hashed;
          gdb
            .run('CREATE(n:patient {first:{parfirst}, \
              last:{parlast}, email:{paremail}, password:{parpassword}}) \
              RETURN n', {parfirst:req.body.first,
              parlast:req.body.last, paremail:req.body.email,
              parpassword:req.body.password})
            .then(data=>{
              console.log(data);
              var sess = req.session;
              sess.email = data.records[0]._fields[0].properties.email;
              sess.patient = data.records[0]._fields[0].identity.low;
              module.exports.sess = sess;
              gdb.close();
              res.json({
                properties: data.records[0]._fields[0].properties,
                uid: data.records[0]._fields[0].identity.low
              });
            })
            .catch((err)=>{
              console.log(err);
            })
        })
      }
        // res.status(409).send("The email address you specified is already in use.");
        console.log(data);
        // gdb.close();
    })
    .catch((err)=>{
      console.log(err)
    })
  },

  signIn: (req, res) => {
    var passwordz = req.body.password;
    gdb
      .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n',
        {paremail:req.body.email })
      .then(data =>{
        console.log(data, data.records[0]._fields[0].properties.email);
        bcrypt.compare(passwordz, data.records[0]._fields[0].properties.password, (error, result) => {
          if(result){
            var sess = req.session;
            sess.email = data.records[0]._fields[0].properties.email;
            sess.patient = data.records[0]._fields[0].identity.low;
            module.exports.sess = sess;
            res.json({
              properties: data.records[0]._fields[0].properties,
              uid: data.records[0]._fields[0].identity.low
            });
          }
          // else {
          //   res.status(401).send("That email and/or password was not found");
          // }
        })
        // gdb.close();
      })
      .catch(err=>{
        console.log(err);
      })


  },

  put_init_form: (req, res) => {
    gdb
      .run('MATCH (n:patient) WHERE id(n)={parid} SET n.first={parfirst}, \
        n.last={parlast}, n.date_of_birth={pardob}, n.address={para}, \
        n.city={parcity}, n.state={parstate}, n.zip={parzip}, n.email={paremail}, \
        n.phone_number={parpn}, n.photo_path={parpp}, n.weight={parweight}, \
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
