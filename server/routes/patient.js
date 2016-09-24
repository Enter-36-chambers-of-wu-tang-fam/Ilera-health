const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Patient = require("../../db/controller/patient-helpers.js");

var sess;

module.exports = {

  signIn: (req, res) => {
    console.log("REQ.BODY", req.body);
    Patient.signIn(req.body, (error, data) => {
      
      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          if(result){
            sess = req.session;
            sess.email = data[0].email;
            sess.patient = data[0].id;
            module.exports.sess = sess;
            res.json(result);
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
    Patient.checkPatient(req.body,(error,data)=> {

      if(error){ throw error;}

      if(data.length > 0){
        res.status(409).send("The email address you specified is already in use.");
      } else {
        console.log()
        hashHelp.hashPassword(req.body.password)
        .then(hashed=>{
          req.body.password = hashed;

          Patient.signUp(req.body, (error, data) => {
            if(error) console.log(error);
            sess = req.session;
            sess.email = req.body.email;
            sess.patient = data.insertId;
            module.exports.sess = sess;
            res.status(200).send();
          });
        })
      }
    });
  },

  post_init_form: (req, res) => {
    Patient.initform_patient(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  post_emer_contact: (req, res) => {
    Patient.emergency_contact_form(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },


  post_insurance_info: (req, res) => {
    Patient.init_insurance(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  get_patient_info: (req, res) => {
    Patient.patient_info(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },
  //
  // (req, res) => {
  //   Patient.funcHere(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
  logout: (req, res) => {
    sess = undefined;
    req.session.destroy();
    res.status(200).send("Logout complete");
  }
};
