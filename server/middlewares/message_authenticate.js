'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config');
const Patient = require('../models/patient-helpers.js');
const Physician = require('../models/physician-helpers.js');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        if(req.params.senderType === "patient" || req.body.sender_type === "patient"){
          Patient.getPatientInfoByID({ uid: decoded.id }, (err,data) =>{
            if (data.length === 0) res.status(404).json({ error: 'No such user'});
            req.params.userid ? req.params.userid = decoded.id : undefined;
            req.body.userid ? req.body.userid = decoded.id : undefined;
            req.body.sender_id ? req.body.sender_id = decoded.id : undefined;
            next();
          });
        }else if(req.params.senderType === "physician" || req.body.sender_type === "physician"){
          Physician.getPhysicianInfoByID({ uid: decoded.id }, (err,data) =>{
          if (data.length === 0) res.status(404).json({ error: 'No such user'});
          req.params.userid ? req.params.userid = decoded.id : undefined;
          req.body.userid ? req.body.userid = decoded.id : undefined;
          req.body.sender_id ? req.body.sender_id = decoded.id : undefined;
          next();
          })
        }
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
