const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Physician = require("../models/physician-helpers.js");

var sess;

module.exports = {

  signIn: (req, res) => {
    console.log("REQUEST BODY REQUEST BODY", req.body);
    Physician.signIn(req.body, (error, data) => {
      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          console.log("RESULT RESULT RESULT", result);
          if(result){
            sess = req.session;
            sess.email = data[0].email;
            sess.user = data[0].id;
            module.exports.sess = sess;
            res.json(data[0].id);
          } else{
            console.log(error);
            res.status(401).send("That email and/or password was not found");
          }
        })
      } else {
        res.status(401).send("That email and/or password was not found");
      }
    })
  },

  signUp: (req, res) => {
    Physician.checkPhysician(req.body,(error,data) => {

      if(error){
        console.log(error);
      }

      if(data.length > 0){
        res.status(409).send("The email address you specified is already in use.");
      } else {
        hashHelp.hashPassword(req.body.password)
        .then(hashed=>{
          req.body.password = hashed;

          Physician.signUp(req.body, (error, data) => {
            if(error) console.log(error);
            sess = req.session;
            sess.email = req.body.email;
            sess.user = data;
            module.exports.sess = sess;
            res.json(data.insertId);
          });
        })
      }
    });
  },

  put_init_form: (req, res) => {
    Physician.update_physician_info(req.body, (err,data)=>{
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
        Physician.update_password(req.body, (error, data) => {
          if(error) console.log(error);
          res.json(data);
        });
      });
    } else {
      Physician.update_password(req.body, (error, data) => {
        if(error) console.log(error);
        res.json(data);
      });
    }
  },

  getAll_Physicians: (req, res) => {
    Physician.getAllPhysicians(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_SpecialtyPhysician: (req, res) => {
    Physician.getSpecialtyPhysician(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  logout: (req, res) => {
    sess = undefined;
    req.session.destroy();
    res.status(200).send("Logout complete");
  }

  // (req, res) => {
  //   Physician.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  // (req, res) => {
  //   Physician.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  // (req, res) => {
  //   Physician.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
