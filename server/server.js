const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');
const db = require('./db/dbConnect/connection.js');
const Appointment = require('./controller/appointment.js');
const HealthLog = require('./controller/health_log.js');
const Institution = require('./controller/institution.js');
const InsurancePlan = require('./controller/insurance_plan.js');
const InsuranceProfesional = require('./controller/insurance_professional.js');
const Medication = require('./controller/medication.js');
const Message = require('./controller/messages.js');
const Patient = require('./controller/patient.js');
const Physician = require('./controller/physician.js');
const Relation_PatPhy = require('./controller/relation-patient_physician.js');
const Staff = require('./controller/staff.js');
// sockets
const SocketIo = require('socket.io');


// this was just to test that the server worked feel free to delete

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// Appointment
app.get('/api/physician/getappointment', Appointment.getOne_AppointmentByPat_id);
app.get('/api/patient/getappointment/:id_physician', Appointment.getOne_appointmentByPhY_id);
app.post('/api/patient/setappointment', Appointment.postAppointment);
app.put('/api/update/appointment', Appointment.updateAppointment);
app.delete('/api/cancel/appointment', Appointment.cancelAppointment);

// InsuranceProfesional
app.get('/api/professional', InsuranceProfesional.signIn);
app.post('/api/professional', InsuranceProfesional.signUp);
app.put('/api/professional', InsuranceProfesional.put_initForm);
app.put('/api/professional', InsuranceProfesional.put_password);
app.post('/api/professional/logout', InsuranceProfesional.logout);

// Patient
app.post('/api/patient/signin', Patient.signIn);

//not for now but this will get all of the patient info eventually we are still in stage 1
app.get('/api/patient/dashboard', Patient.get_patient_info);

// Post Request to: api/patient/signup  =>   { Patient Table}
app.post('/api/patient/signup', Patient.signUp);

// Post request to: /api/patient/background => { Patient }
app.put('/api/patient/background', Patient.put_init_form);
app.put('/api/patient/password/update', Patient.put_password);
// Post request to: /api/patient/emergency_contacts => { Emergency Table }
app.post('/api/patient/emergency_contacts', Patient.post_emer_contact);
// Post Request To: api/patient/insurance => { insurance }
app.post('/api/patient/insurance', Patient.post_insurance_info);

app.post('api/patient/logout', Patient.logout);

// Physician
// Post Request To: /api/physician/signup i think this is a guess
app.post('/api/physician/signup', Physician.signUp);

app.post('/api/physician/signin', Physician.signIn);
app.post('/api/patient/getallphy', Physician.getAll_Physicians);
app.post('/api/patient/getallphy/specialty', Physician.getAll_SpecialtyPhysician);
app.put('/api/physician/background', Physician.put_init_form);
app.put('/api/physician/password/update', Physician.put_password);
app.post('/api/physician/logout', Physician.logout);

//  post to health_log
// app.post('/api/health_log', HealthLog.postHealthLog);

// Get Request → /api/healthlog/:physid/:patid  [ limit 5]
// app.get('/api/healthlog/:physid/:patid', Institution.getPatientPhysicianRelation);
// Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
// app.get('/api/patient_physician/:physicianid', something);

app.post('/api/messages/newmessage', Message.postMessage);


app.get('/api/messages/:physid/:patid', Message.getAllMessages_phy_from_pat);
app.get('/api/messages/:patid/:physid', Message.getAllMessages_pat_from_phy);

app.get('/api/messages/getOne', Message.getOneMessage);
app.put('/api/messages/edit', Message.editOneMessage);
app.delete('/api/messages/delete', Message.deleteOneMessage);

// Relation_PatPhy
app.get('/api/patient/physicians', Relation_PatPhy.getAll_physicians_of_patient);
app.get('/api/relation', Relation_PatPhy.getPatientPhysicianRelation);
app.get('/api/physician/patients', Relation_PatPhy.getAll_patients_of_Physician);
app.post('/api/relation/create', Relation_PatPhy.createPatientPhysicianRelation);

// Staff
app.post('/api/staff/signup', Staff.signUp);
app.get('/api/staff/signin', Staff.signIn);
app.put('/api/staff/background', Staff.put_staffInfo);
// app.put('/api/staff/password/update', Staff.put_password);
app.post('/api/staff', Staff.logout);

// INSERTED TEMPORARLILY TO TEST OUT ROUTING ON FRONT END
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '/../client/'))
//   })


//catch all
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});


const server = app.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

const io = new SocketIo(server, {path: '/patient/messages'})
const socketEvents = require('./sockets/socket-events')(io);

module.exports = app;
