'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config');
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
        Physician.getPhysicianInfoByID({ uid: decoded.id }, (error,data) =>{
          if (error || !data) res.status(404).json({ error: 'No such user'});
          //Account taken for variation in id naming

          req.body.uid ? req.body.uid = decoded.id : undefined;
          req.params.uid ? req.params.uid = decoded.id : undefined;
          req.params.userid ? req.params.userid = decoded.id : undefined;
          req.body.userid ? req.body.userid = decoded.id : undefined;
          req.params.id_physician ? req.params.id_physician = decoded.id : undefined;
          req.body.id_physician ? req.body.id_physician = decoded.id : undefined;
          next();
        });
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
