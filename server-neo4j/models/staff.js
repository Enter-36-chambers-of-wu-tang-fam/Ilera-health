const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  signUp: (req, res) => {
    gdb
      .run('MATCH (s:staff) \
        WHERE s.email={paremail} \
        RETURN s', {paremail:req.body.email })
      .then(data => {
        if(data.records.length <= 0){
          hashHelp.hashPassword(req.body.password)
          .then(hashed =>{
            req.body.password = hashed;
            gdb
              .run('CREATE(s:staff {first:{parfirst}, \
                last:{parlast}, email:{paremail}, password:{parpassword}}) \
                RETURN s', {parfirst:req.body.first,
                parlast:req.body.last, paremail:req.body.email,
                parpassword:req.body.password})
              .then(data=>{
                console.log(data);
                var sess = req.session;
                sess.email = data.records[0]._fields[0].properties.email;
                sess.staff = data.records[0]._fields[0].identity.low;
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
      .run('MATCH (s:staff) \
        WHERE s.email={paremail} \
        RETURN s',
        {paremail:req.body.email })
      .then(data =>{
        console.log(data, data.records[0]._fields[0].properties.email);
        bcrypt.compare(passwordz, data.records[0]._fields[0].properties.password, (error, result) => {
          if(result){
            var sess = req.session;
            sess.email = data.records[0]._fields[0].properties.email;
            sess.staff = data.records[0]._fields[0].identity.low;
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
      .run('MATCH (s:patient) \
        WHERE id(s)={parid} \
        SET s.first={parfirst}, \
        s.last={parlast}, s.email={paremail}, s.phone_number={parpn}, \
        s.photo_path={parpp}',
        {parid:req.body.uid, parfirst:req.body.first, parlast:req.body.last,
          paremail:req.body.email, parpn:req.body.phone_number,
          parpp:req.body.photo_path })
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


// CREATE TABLE `staff` (
//   `id` INTEGER NOT NULL AUTO_INCREMENT,
//   `first` VARCHAR(50) NULL,
//   `last` VARCHAR(50) NULL,
//   `email` VARCHAR(100) NULL,
//   `phone_number` VARCHAR(25) NULL,
//   `password` VARCHAR(200) NULL,
//   `photo_path` VARCHAR(300) NULL,
//   PRIMARY KEY (`id`)
// );
