const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  signUp: (req, res) => {
    gdb
      .run('MATCH (py:physician) WHERE py.email={paremail} RETURN py', {paremail:req.body.email })
      .then(function(data){
        if(data.records.length <= 0){
          hashHelp.hashPassword(req.body.password)
          .then(hashed =>{
            req.body.password = hashed;
            gdb
              .run('CREATE(py:physician {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN py', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
              .then((data)=>{
                console.log(data);
                var sess = req.session;
                sess.email = data.records[0]._fields[0].properties.email;
                sess.physician = data.records[0]._fields[0].identity.low;
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
      .run('MATCH (py:physician) WHERE py.email={paremail} RETURN py', {paremail:req.body.email })
      .then((data)=>{
        console.log(data, data.records[0]._fields[0].properties.email);
        bcrypt.compare(passwordz, data.records[0]._fields[0].properties.password, (error, result) => {
          if(result){
            var sess = req.session;
            sess.email = data.records[0]._fields[0].properties.email;
            sess.physician = data.records[0]._fields[0].identity.low;
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
