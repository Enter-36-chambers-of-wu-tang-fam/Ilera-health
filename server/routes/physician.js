const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Physician = require("../controller/physician-helpers.js");

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
            res.status(200).send();
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
    Physician.checkPhysician(req.body,(error,data) => {
      if(error){ throw error;}
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
            sess.user = data.insertId;
            module.exports.sess = sess;
            res.status(200).json(data);
          });
        })
      }
    });
  },

  getAll_Physicians: (req, res) => {
    Patient.getAllPhysicians(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_SpecialtyPhysician: (req, res) => {
    Patient.getSpecialtyPhysician(req.body, (err,data)=>{
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
  //   Patient.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  // (req, res) => {
  //   Patient.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  // (req, res) => {
  //   Patient.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },

};
