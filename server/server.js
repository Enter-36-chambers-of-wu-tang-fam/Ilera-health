const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes.js');
const Message = require('./controller/messages.js');
const io = require('socket.io')(server);
const socketEvents = require('./sockets/socket-events')(io);

app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

router(app);
app.post('/api/messages/newmessage', Message.postMessage);

// app.get('/api/messages/:senderType/:userid/:receiverType/:rid', Message.getAllMessages);
app.get('/api/messages/:physid/:patid', Message.getAllMessages_phy_from_pat);
// app.get('/api/messages/patient/:patid/:physid', Message.getAllMessages_pat_from_phy);
app.get('/api/messages/:senderType/:userid/:receiverType/:rid', Message.getAllMessages);
app.get('/api/messages/getOne', Message.getOneMessage);
app.put('/api/messages/edit', Message.editOneMessage);
app.delete('/api/messages/delete', Message.deleteOneMessage);

app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});

server.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = server;








// ========+++++++++++========OLD WAY +++++++++++++=============+++++++++==============
// this was just to test that the server worked feel free to delete
// const db = require('./db/dbConnect/connection.js');
// const Appointment = require('./controller/appointment.js');
// const HealthLog = require('./controller/health_log.js');
// const Institution = require('./controller/institution.js');
// const Insurance = require('./controller/insurance.js');
// const InsurancePlan = require('./controller/insurance_plan.js');
// const InsuranceProfesional = require('./controller/insurance_professional.js');
// const Medication = require('./controller/medication.js');
// const Message = require('./controller/messages.js');
// // const MJ = require('./controller/major-joins.js');
// const Patient = require('./controller/patient.js');
// const Physician = require('./controller/physician.js');
// const Relation_PatPhy = require('./controller/relation-patient_physician.js');
// const Staff = require('./controller/staff.js');
// sockets

// // Appointment
// app.get('/api/physician/getappointment', Appointment.getOne_AppointmentByPat_id);
// app.get('/api/patient/getappointment/:id_physician', Appointment.getAll_appointmentByPhY_id);
// app.post('/api/patient/setappointment', Appointment.postAppointment);
// app.put('/api/update/appointment', Appointment.updateAppointment);
// app.delete('/api/cancel/appointment', Appointment.cancelAppointment);
//
// // InsuranceProfesional
// app.get('/api/professional', InsuranceProfesional.signIn);
// app.post('/api/professional', InsuranceProfesional.signUp);
// app.put('/api/professional', InsuranceProfesional.put_initForm);
// app.put('/api/professional', InsuranceProfesional.put_password);
// app.post('/api/professional/logout', InsuranceProfesional.logout);
//
//
// // Insurance
// app.get('/api/insurance/insurer', Insurance.getAllInsurance);
// app.get('/api/insurance/insurer/:specific', Insurance.get_specificInsurance);
//
// // Patient
// app.post('/api/patient/signin', Patient.signIn);
// // Patient major join
// // app.get('/api/patient/something', Mj.getAll);
// //not for now but this will get all of the patient info eventually we are still in stage 1
// // app.get('/api/patient/dashboard', Patient.get_patient_info);
// app.get('/api/patient/:userid', Patient.get_patient_info);
//
// // Post Request to: api/patient/signup  =>   { Patient Table}
// app.post('/api/patient/signup', Patient.signUp);
//
// // Post request to: /api/patient/background => { Patient }
// app.put('/api/patient/background', Patient.put_init_form);
// app.put('/api/patient/health', Patient.put_init_form_health);
// app.put('/api/patient/password/update', Patient.put_password);
// // Post request to: /api/patient/emergency_contacts => { Emergency Table }
// app.post('/api/patient/contact', Patient.post_emer_contact);
// // Post Request To: api/patient/insurance => { insurance }
// app.post('/api/patient/insurance', InsurancePlan.post_initInsurance_plan);
//
// app.post('/api/patient/logout', Patient.logout);
//
// // Physician
// // Post Request To: /api/physician/signup i think this is a guess
// app.post('/api/physician/signup', Physician.signUp);
//
// app.post('/api/physician/signin', Physician.signIn);
// app.get('/api/patient/getallphy', Physician.getAll_Physicians);
// app.post('/api/patient/getallphy/specialty', Physician.getAll_SpecialtyPhysician);
// app.put('/api/physician/background', Physician.put_init_form);
// app.put('/api/physician/password/update', Physician.put_password);
// app.post('/api/physician/logout', Physician.logout);
//
// //  post to health_log
// // app.post('/api/health_log', HealthLog.postHealthLog);
//
// // Get Request → /api/healthlog/:physid/:patid  [ limit 5]
// // app.get('/api/healthlog/:physid/:patid', Institution.getPatientPhysicianRelation);
// // Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
// // app.get('/api/patient_physician/:physicianid', something);
//
// app.post('/api/messages/newmessage', Message.postMessage);
//
//
// app.get('/api/messages/:physid/:patid', Message.getAllMessages_phy_from_pat);
// app.get('/api/messages/patient/:patid/:physid', Message.getAllMessages_pat_from_phy);
//
// app.get('/api/messages/getOne', Message.getOneMessage);
// app.put('/api/messages/edit', Message.editOneMessage);
// app.delete('/api/messages/delete', Message.deleteOneMessage);
//
// // Relation_PatPhy

// HERE

// app.get('/api/patient/:userid/physicians', Relation_PatPhy.test_getAll_physicians_of_patient);
// app.get('/api/patient/:userid/physicians', Relation_PatPhy.getAll_physicians_of_patient);
// app.get('/api/relation', Relation_PatPhy.getPatientPhysicianRelation);
// app.get('/api/physician/patients', Relation_PatPhy.getAll_patients_of_Physician);
// app.post('/api/relation/create', Relation_PatPhy.createPatientPhysicianRelation);
//
// // Staff
// app.post('/api/staff/signup', Staff.signUp);
// app.get('/api/staff/signin', Staff.signIn);
// app.put('/api/staff/background', Staff.put_staffInfo);
// // app.put('/api/staff/password/update', Staff.put_password);
// app.post('/api/staff', Staff.logout);

// INSERTED TEMPORARLILY TO TEST OUT ROUTING ON FRONT END
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '/../client/'))
//   })


//catch all
