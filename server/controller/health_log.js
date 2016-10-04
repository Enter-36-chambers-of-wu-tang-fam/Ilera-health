const Health_log = require('../models/health_log-helpers.js');

module.exports = {

  getHealthLog: (req, res) => {
    Health_log.get_all_health_logs_by_patient_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getOne_healthLog: (req, res) => {
    Health_log.get_one_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },


  getAll_healthLogsBy_patientPhysician_id: (req, res) => {
    Health_log.get_all_health_logs_by_patient_physician_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  postHealthLog: (req, res) => {
    Health_log.add_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  put_patient_healthLog: (req, res) => {
    Health_log.patient_update_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  put_physician_healthLog: (req, res) => {
    Health_log.physician_update_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },


  deleteOne_healthLog: (req, res) => {
    Health_log.deleteOne_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
