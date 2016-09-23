'use strict'

const db = require('../dbConnect/connection.js');


module.exports.messages = {
  get_messages: (params, cb) => {
    // Get Request → /api/messages/:physid/:patid  [limit 5]
    let data = [params.receiver_id, params.sender_id];
    const queryString = 'SELECT * FROM messages WHERE receiver_id=? AND sender_id=? LIMIT 5';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }
  // (params, cb) => {
  //   let data = [params]
  //
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};
