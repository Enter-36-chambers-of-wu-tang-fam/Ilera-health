'use strict'

const Message = require("../../db/controller/messages-helpers.js");

module.exports.messages = {

  getMessages: (req, res) => {
    Message.get_messages(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

}
