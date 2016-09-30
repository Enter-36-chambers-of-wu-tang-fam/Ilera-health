const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  signUp: (req, res) => {
    gdb
    .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n', {paremail:req.body.email })
    .then(function(data){
      if(data.records.length <= 0){
        hashHelp.hashPassword(req.body.password)
        .then(hashed =>{
          req.body.password = hashed;
          gdb
            .run('CREATE(n:patient {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN n', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
            .then((data)=>{
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
      .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n', {paremail:req.body.email })
      .then((data)=>{
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
      .catch((err)=>{
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
