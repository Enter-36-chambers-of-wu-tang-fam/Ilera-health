const Staff = require('../../controller/staff.js');

module.exports = app => {

  app.post('/api/staff/signup', Staff.signUp);
  app.get('/api/staff/signin', Staff.signIn);
  app.put('/api/staff/background', Staff.put_staffInfo);
  // app.put('/api/staff/password/update', Staff.put_password);
  app.post('/api/staff', Staff.logout);
  
}
