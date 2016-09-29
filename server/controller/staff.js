const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Staff = require('../models/staff-helpers.js');

module.exports = {

  signIn: (req, res) => {
    console.log("REQ.BODY", req.body);
    Staff.signIn(req.body, (error, data) => {

      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          if(result){
            sess = req.session;
            sess.email = data[0].email;
            sess.patient = data[0].id;
            module.exports.sess = sess;
            res.status(202).send();
          } else{
            res.status(401).send("That email and/or password was not found");
          }
        })
      } else {
        res.status(401).send("That email and/or password was not found");
      }
    })
  },

  signUp: (req, res) => {
    Staff.checkStaff(req.body,(error,data)=> {

      if(error){ console.log(error);}

      if(data.length > 0){
        res.status(409).send("The email address you specified is already in use.");
      } else {
        console.log()
        hashHelp.hashPassword(req.body.password)
        .then(hashed=>{
          req.body.password = hashed;

          Staff.signUp(req.body, (error, data) => {
            if(error) console.log(error);
            sess = req.session;
            sess.email = req.body.email;
            sess.patient = data;
            module.exports.sess = sess;
            res.json(data);
          });
        })
      }
    });
  },

  put_staffInfo: (req, res) => {
    Staff.init_staff_info(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  put_password: (req, res) => {
    if(req.body.newPassword){
      hashHelp.hashPassword(req.body.password)
      .then( hash => {
        delete req.body.newPassword;
        req.body.password = hash;
        Staff.init_staff_info(req.body, (error, data) => {
          if(error) console.log(error);
          res.json(data);
        });
      });
    } else {
      Staff.init_staff_info(req.body, (error, data) => {
        if(error) console.log(error);
        res.json(data);
      });
    }
  },

  logout: (req, res) => {
    sess = undefined;
    req.session.destroy();
    res.status(200).send("Logout complete");
  }


  // (req, res) => {
  //   Staff.patient_physician_relation(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // }

};
