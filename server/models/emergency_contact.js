'use strict'

// =========++++++++++ READ ME +++++++++==============
// these functions are used in .././controller/patient.js

const db = require('../db/dbConnect/connection.js');


module.exports = {

  get_emergency_contact:(params, cb) => {
    let data = [params.userid];
    const queryString = 'SELECT * \
      FROM emergency_contact \
      WHERE id_patient=?';
    db.query(queryString, data, (error, results)=> cb(error, results));
  },


  emergency_contact_form:(params, cb) => {
    let data = [params.e_1_contact_first, params.e_1_contact_last,
      params.e_1_contact_phone, params.e_1_contact_email,
      params.e_1_contact_relationship, params.e_2_contact_first,
      params.e_2_contact_last, params.e_2_contact_phone,
      params.e_2_contact_email, params.e_2_contact_relationship, params.uid];
    // Post request to: /api/user/emergency_contacts => { Emergency Table }
    const queryString = 'INSERT INTO emergency_contact(e_1_contact_first, \
      e_1_contact_last, e_1_contact_phone, e_1_contact_email, \
      e_1_contact_relationship, e_2_contact_first, e_2_contact_last, \
      e_2_contact_phone, e_2_contact_email, e_2_contact_relationship, \
      id_patient) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(queryString, data, (error, results) => cb(error, results) );
  },

  update_emergency_contact_form:(params, cb) => {
    let data = [params.e_1_contact_first, params.e_1_contact_last,
      params.e_1_contact_phone, params.e_1_contact_email,
      params.e_1_contact_relationship, params.e_2_contact_first,
      params.e_2_contact_last, params.e_2_contact_phone,
      params.e_2_contact_email, params.e_2_contact_relationship, params.uid];
    // Post request to: /api/user/emergency_contacts => { Emergency Table }
    const queryString = 'UPDATE emergency_contact SET e_1_contact_first=?, \
      e_1_contact_last=?, e_1_contact_phone=?, e_1_contact_email=?, \
      e_1_contact_relationship=?, e_2_contact_first=?, e_2_contact_last=?, \
      e_2_contact_phone=?, e_2_contact_email=?, e_2_contact_relationship=? \
      WHERE id_patient=?';
    db.query(queryString, data, (error, results) => cb(error, results) );
  }

};
