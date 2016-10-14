const HealthLog = require('../../controller/health_log.js');
// const authenticate = require('../../middlewares/authenticate');

module.exports = app => {

  app.post('/api/healthlog', HealthLog.postHealthLog);
  
}
