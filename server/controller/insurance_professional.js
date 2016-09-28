const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Professional = require('../models/insurance_company_professional-helper.js');

var sess;

module.exports = {

  signIn: (req, res) => {
    Professional.signIn(req.body, (error, data) => {
      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          if(result){
            sess = req.session;
            sess.email = data[0].email;
            sess.patient = data[0].id;
            module.exports.sess = sess;
            res.json(data[0].id);
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
    Professional.checkPatient(req.body,(error,data)=> {

      if(error){ console.log(error);}

      if(data.length > 0){
        res.status(409).send("The email address you specified is already in use.");
      } else {
        hashHelp.hashPassword(req.body.password)
        .then(hashed=>{
          req.body.password = hashed;

          Professional.signUp(req.body, (error, data) => {
            if(error) console.log(error);
            sess = req.session;
            sess.email = req.body.email;
            sess.patient = data;
            module.exports.sess = sess;
            res.json(data.insertId);
          });
        })
      }
    });
  },



};
