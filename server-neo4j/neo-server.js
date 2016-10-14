'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes.js');
const io = require('socket.io')(server);
const socketEvents = require('./sockets/socket-events')(io);

// const neodb = require('./graphDb/graphConnect.js').graphdb;

// the lines below are for the package json
// ./server-neo4j/neo-server.js
// ./server/server.js
// const neo4j = require('neo4j-driver').v1;

// const Appointment = require('./models/appointment.js');
// const HealthLog = require('./models/health_log.js');
// const Institution = require('./models/institution.js');
// const InsurancePlan = require('./models/insurance_plan.js');
// const InsuranceProfesional = require('./models/insurance_professional.js');
// const Medication = require('./models/medication.js');
// const Message = require('./models/messages.js');
const Patient = require('./models/patient.js');
const Physician = require('./models/physician.js');
// const Relation_PatPhy = require('./models/relation-patient_physician.js');
// const Staff = require('./models/staff.js');

// sockets
// const SocketIo = require('socket.io');


// this was just to test that the server worked feel free to delete

app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// router(app);


app.post('/api/patient/signin', Patient.signIn);



app.post('/api/patient/signup', Patient.signUp);

app.put('/api/patient/background', Patient.put_init_form);


app.post('/api/physician/signup', Physician.signUp);
//
app.post('/api/physician/signin', Physician.signIn);

//catch all
app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});


server.listen(3636);
console.log("Neo-Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

// const io = new SocketIo(server, {path: '/patient/messages'})
// const socketEvents = require('./sockets/socket-events')(io);

module.exports = server;
