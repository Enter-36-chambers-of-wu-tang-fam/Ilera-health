const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const db = require('../db/dbConnect/connection.js');
const Institution = require('./routes/institution.js');
const Physician = require('./routes/physician.js');
const Message = require('./routes/messages.js');
const HealthLog = require('./routes/health_log.js');
const path = require('path');
const Patient = require('./routes/patient.js');
// this was just to test that the server worked feel free to delete

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.get('/api/user/signin', Patient.signIn);

//not for now but this will get all of the patient info eventually we are still in stage 1
app.get('/api/user/dashboard', Patient.get_patient_info);

// Post Request to: api/user/signup  =>   { Patient Table}
app.post('/api/user/signup', Patient.signUp);

// Post request to: /api/user/emergency_contacts => { Emergency Table }
app.post('/api/user/emergency_contacts', Patient.post_emer_contact);
// Post Request To: api/user/insurance => { insurance }
app.post('/api/user/insurance', Patient.post_insurance_info);

// Post Request To: /api/physician/signup i think this is a guess
app.post('/api/physician/signup', Physician.signUp);

//  post to health_log
app.post('/api/health_log', HealthLog.postHealthLog);

// Get Request → /api/healthlog/:physid/:patid  [ limit 5]
app.get('/api/healthlog/:physid/:patid', Institution.get_patient_physician_relation);
// Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
// app.get('/api/patient_physician/:physicianid', something);
// Get Request → /api/messages/:physid/:patid  [limit 5]
app.get('/api/messages/:physid/:patid', Message.getMessages);


// INSERTED TEMPORARLILY TO TEST OUT ROUTING ON FRONT END
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '/../client/'))
//   })

//catch all
app.use('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


app.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = app;
