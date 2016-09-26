'use strict'

const Message = require("../../db/controller/messages-helpers.js");
const Promise = require("bluebird");

module.exports = {

  getMessages: (req, res) => {
    Message.get_all_messages(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  // added
  getOneMessage: (req, res) => {
    Message.get_one_message(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  },

  // added
  postMessage: (req, res) => {
    console.log("we are here", req.body)
    Message.post_message(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  },

  // added
  deleteOneMessage: (req, res) => {
    Message.delete_one_message(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  },

  // added
  editOneMessage: (req, res) => {
    Message.edit_one_message(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    })
  }
  

  // checkUser:  (params, callback) => {
  //   let data = [params.email];
  //   const query = "SELECT * FROM users WHERE email=? LIMIT 1";
  //   db.query(query, data, (err, results) => callback(err, results) );
  // },


  // (req, res) => {
  //   Message.get_one_message(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   })
  // },
}
