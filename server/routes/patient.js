const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Patient = require("../../db/controller/patient-helpers.js");

module.exports = {
  signIn: (req, res) => {
    Patient.signIn(req.body, (error, data) => {
      if(!data.length){
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
    Patient.checkPatient(req.body,(error,data)=> {

      if(error){ throw error;}

      if(data.length > 0){
        res.status(409).send("The email address you specified is already in use.");
      } else {
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

  logout: (req, res) => {
    sess = undefined;
    req.session.destroy();
    res.status(200).send("Logout complete");
  }
};
