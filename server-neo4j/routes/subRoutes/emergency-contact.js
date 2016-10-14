const EmergencyContact = require('../../controller/emergency_contact.js');
// const authenticate = require('../../middlewares/authenticate');

module.exports = app => {
  app.post('/api/patient/contact', EmergencyContact.post_emer_contact);
  app.put('/api/patient/contacts/update', EmergencyContact.put_emer_contact);
  app.get('/api/patient/contacts/:userid', EmergencyContact.get_emergencyContact);
};
