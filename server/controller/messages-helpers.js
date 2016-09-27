'use strict'

const db = require('../db/dbConnect/connection.js');


module.exports = {

  // changed
  get_all_messages: (params, cb) => {
    // Get Request → /api/messages/:physid/:patid  [limit 5]
    console.log("PARAMS", params.userid);
    let data = [params.userid, params.userid];
    const queryString = 'SELECT p.id, p.first, p.last, p.email, \
      p.phone_number, p.photo_path, py.id, py.first, py.last, py.email, \
      py.phone_number, py.photo_path, m.id, m.direct_message, m.date, \
      m.sender_id, m.receiver_id \
      FROM messages m WHERE sender_id=? OR receiver_id=? \
      JOIN patient p ON p.id = m.sender_id OR p.id = m.receiver_id \
      JOIN physician py ON py.id = m.sender_id OR py.id = m.receiver_id \
      ORDER BY date DESC LIMIT 25';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },
  // const queryString = 'SELECT * FROM messages WHERE receiver_id=? OR sender_id=?\
  //   ORDER BY date DESC LIMIT 25';
  // may not need this
  // added
  get_one_message: (params, cb) => {
    // Get Request → /api/messages/:physid/:patid  [limit 5]
    let data = [params.id];
    const queryString = 'SELECT * FROM messages WHERE id=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  post_message: (params, cb) => {
    console.log("PARAMS", params)
    let data = [ params.direct_message.text, null,
      null ];
    const queryString = 'INSERT INTO messages(direct_message, sender_id, \
      receiver_id, date) value (?,?,?, NOW())';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  // this can allow sent and recieved user to delete messages
  delete_one_message: (params, cb) => {
    let data = [params.id];
    const queryString = 'DELETE FROM messages WHERE id=? LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  // added
  edit_one_message: (params, cb) => {
    let data = [params.direct_message];
    const queryString = 'UPDATE messages SET direct_message=? WHERE \
      id ="'+params.id+'" LIMIT 1';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

  // (params, cb) => {
  //   let data = [params];
  //   const queryString = '';
  //   db.query(queryString, data, (error, results) => cb(error, results) );
  // },

};
