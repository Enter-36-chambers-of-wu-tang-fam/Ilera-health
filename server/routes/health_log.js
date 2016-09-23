const Health_log = require('../../db/controller/health_log-helpers.js');

module.exports.healthLog = {

  getHealthLog: (req, res) => {
    Health_log.get_health_logs(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  postHealthLog: (req, res) => {
    Health_log.add_health_log(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
