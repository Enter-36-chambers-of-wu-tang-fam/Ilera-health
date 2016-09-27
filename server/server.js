const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');
const db = require('./db/dbConnect/connection.js');
//const Appointment
const HealthLog = require('./routes/health_log.js');
const Institution = require('./routes/institution.js');
const InsurancePlan = require('./routes/insurance_plan.js');
const InsuranceProfesional = require('./routes/insurance_professional.js');
const Medication = require('./routes/medication.js');
const Message = require('./routes/messages.js');
const Patient = require('./routes/patient.js');
const Physician = require('./routes/physician.js');

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

app.post('/api/patient/signin', Patient.signIn);

//not for now but this will get all of the patient info eventually we are still in stage 1
app.get('/api/patient/dashboard', Patient.get_patient_info);

// Post Request to: api/patient/signup  =>   { Patient Table}
app.post('/api/patient/signup', Patient.signUp);

// Post request to: /api/patient/background => { Patient }
app.put('/api/patient/background', Patient.put_init_form);
// Post request to: /api/patient/emergency_contacts => { Emergency Table }
app.post('/api/patient/emergency_contacts', Patient.post_emer_contact);
// Post Request To: api/patient/insurance => { insurance }
app.post('/api/patient/insurance', Patient.post_insurance_info);

// app.post('api/patient/logout', Patient.logout);
// Post Request To: /api/physician/signup i think this is a guess
app.post('/api/physician/signup', Physician.signUp);

app.post('/api/physician/signin', Physician.signIn);
// app.post('api/physician/logout', Physician.logout);

//  post to health_log
// app.post('/api/health_log', HealthLog.postHealthLog);

// Get Request → /api/healthlog/:physid/:patid  [ limit 5]
// app.get('/api/healthlog/:physid/:patid', Institution.getPatientPhysicianRelation);
// Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
// app.get('/api/patient_physician/:physicianid', something);
// Get Request → /api/messages/:physid/:patid  [limit 5]
// app.get('/api/messages/:physid/:patid', Message.getMessages);
app.post('/api/messages/newmessage', Message.postMessage);

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
