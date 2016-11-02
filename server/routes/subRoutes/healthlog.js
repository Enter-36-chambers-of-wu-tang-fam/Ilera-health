const HealthLog = require('../../controller/health_log.js');
// const authenticate = require('../../middlewares/authenticate');

module.exports = app => {

  // app.get('/api/healthlog/:id_physician', HealthLog.);
  app.get('/api/healthlog/:id_patient', HealthLog.getHealthLog);
  app.post('/api/healthlog', HealthLog.postHealthLog);

}
