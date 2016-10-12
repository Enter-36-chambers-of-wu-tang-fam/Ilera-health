const jwt = require('jsonwebtoken');
const config = require('../config');
const Patient = require('../models/patient-helpers.js');

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
        Patient.getPatientInfoByID({ uid: decoded.id }, (err,data) =>{
          if (data.length === 0) res.status(404).json({ error: 'No such user'});
          req.body.uid = req.body.uid ? decoded.id : undefined;
          req.params.uid = req.params.uid ? decoded.id : undefined;
          req.params.userid = req.params.userid ? decoded.id : undefined;
          req.params.id_patient = req.params.id_patient ? decoded.id : undefined;
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