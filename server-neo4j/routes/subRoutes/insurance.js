const Insurance = require('../../controller/insurance.js');

module.exports = app => {

  app.get('/api/insurance/insurer', Insurance.getAllInsurance);
  app.get('/api/insurance/insurer/:specific', Insurance.get_specificInsurance);

}
