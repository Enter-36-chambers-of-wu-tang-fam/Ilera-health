'use strict'

const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require("../security/hash.js");
const Physician = require("../models/physician-helpers.js");
// const jwt = require("jsonwebtoken");
// const config = require("../config");

module.exports = {

  signIn: (req, res) => {
    Physician.signIn(req.body, (error, data) => {
      if(data.length > 0){
        bcrypt.compare(req.body.password, data[0].password, (error, result) => {
          if(result){
            // const token =jwt.sign({
            //     id: data[0].id,
            //   }, config.jwtSecret)
            res.json({
              id: data[0].id,
              email: data[0].email,
              first: data[0].first,
              last: data[0].last,
              photo_path: data[0].photo_path
            });
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
            console.log("id type", data);
            if(error) console.log(error);
             if(data[0] !== undefined){
                  // const token = jwt.sign({
                  //   id: data[0].id,
                  // }, config.jwtSecret)

                res.json({
                  data: data[0],
                  first: req.body.first,
                  last: req.body.last,
                  email: req.body.email,
                  id: data[0].id
                });
             }else{
                // const token = jwt.sign({
                //   id: data.insertId,
                // }, config.jwtSecret)

                res.json({id: data.insertId})
             }
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
    Physician.getAllPhysicians((err,data)=>{
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
    req.session.destroy();
    res.status(200).send("Logout complete");
  },

  checkBetterDoc: (req,res) => {
    Physician.checkBetterDoc(req.body, (err,exists) => {
      if(err) console.log(err);
      res.json(exists);
    })
  },

  addBetterDoc: (req,res) => {
    Physician.checkBetterDoc(req.body, (err,exists) => {
      if(exists.length === 0){
        Physician.addBetterDocId(req.body, (error,data) =>{
          if(err) console.log(error);
          res.json(data.insertId);
        });
      }else{
        res.json(exists[0].id);
      }
      })
    },

    getSinglePhysician: (req,res) => {
      Physician.getPhysicianInfoByID(req.params, (err,exists) => {
        if(err) console.log(err);
        res.json(exists);
      })
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
