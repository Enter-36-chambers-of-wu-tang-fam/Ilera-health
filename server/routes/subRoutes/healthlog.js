const HealthLog = require('../../controller/health_log.js');

module.exports = app => {

  app.post('/api/healthlog', HealthLog.postHealthLog);
  
}
