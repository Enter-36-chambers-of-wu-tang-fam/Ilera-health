const Appointment = require('../../controller/appointment.js');

module.exports = app => {
  // Appointment
  app.get('/api/physician/getappointment', Appointment.getOne_AppointmentByPat_id);
  app.get('/api/patient/getappointment/:id_physician', Appointment.getAll_appointmentByPhY_id);
  app.get('/api/patient/getappointments/:id_patient', Appointment.getAll_appointmentByPat_id);
  app.post('/api/patient/setappointment', Appointment.postAppointment);
  app.put('/api/update/appointment', Appointment.updateAppointment);
  app.delete('/api/cancel/appointment', Appointment.cancelAppointment);
};
