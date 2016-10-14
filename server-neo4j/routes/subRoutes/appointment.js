const Appointment = require('../../controller/appointment.js');
// const authenticate = require('../../middlewares/authenticate');
// const physicianAuth = require('../../middlewares/physician_authenticate');

module.exports = app => {
  // Appointment
  app.get('/api/physician/getappointment', Appointment.getOne_AppointmentByPat_id);

  app.get('/api/patient/getappointment/:id_physician', Appointment.getAll_appointmentByPhY_id);

  app.get('/api/patient/getappointments/:id_patient', Appointment.getAll_appointmentByPat_id);

  app.get('/api/physician/appointments/:uid', Appointment.getAll_physician_appointmentsPatientInfo);

  app.post('/api/patient/setappointment', Appointment.postAppointment);

  app.put('/api/update/appointment', Appointment.updateAppointment);

  app.delete('/api/cancel/appointment', Appointment.cancelAppointment);

};