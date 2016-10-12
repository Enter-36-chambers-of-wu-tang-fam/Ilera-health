const EmergencyContact = require('../../controller/emergency_contact.js');
const authenticate = require('../../middlewares/authenticate');
module.exports = app => {
  // Post request to: /api/patient/emergency_contacts => { Emergency Table }
  app.post('/api/patient/contact', authenticate, EmergencyContact.post_emer_contact);
  app.put('/api/patient/contacts/update', authenticate, EmergencyContact.put_emer_contact);
  app.get('/api/patient/contacts/:userid', authenticate, EmergencyContact.get_emergencyContact);

};
