// const Mj = require('.././controller/major-joins.js'); //Remove on following clean-up when final decision to not be moved is made

const Appointment = require('./subRoutes/appointment.js');
const EmergencyContact = require('./subRoutes/emergency-contact.js');
const Patient = require('./subRoutes/patient.js');
const HealthLog = require('./subRoutes/healthlog.js');
const Institution = require('./subRoutes/institution.js');
const Insurance = require('./subRoutes/insurance.js');
const InsurancePlan = require('./subRoutes/insurance_plan.js');
const InsuranceProfesional = require('./subRoutes/insuranceProfesional.js');
// const Medication = require('./subRoutes/medication.js');
const Message = require('./subRoutes/messages.js');
const PatientMedications = require('./subRoutes/patient-medications.js');
const Physician = require('./subRoutes/physician.js');
const Relation_PatPhy = require('./subRoutes/Relation-Pat-Phy.js');
const Staff = require('./subRoutes/staff.js');
const Uploads = require('./subRoutes/uploads.js');

module.exports = app => {
  Appointment(app);
  EmergencyContact(app);
  HealthLog(app);
  Insurance(app);
  InsurancePlan(app);
  InsuranceProfesional(app);
  Institution(app);
  // Medication(app);
  Message(app);
  PatientMedications(app);
  Patient(app);
  Physician(app);
  Relation_PatPhy(app);
  Staff(app);
	Uploads(app);

};