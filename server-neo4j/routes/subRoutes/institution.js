const Institution = require('../../controller/institution.js');

module.exports = app => {
  app.get('/api/staff/institution/form', Institution.getAll_institutions);
};
