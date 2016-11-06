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


const getAll = require('./controller/allPatient.js');


//Need to create secure JWT key and move to ENV variable

//JWT authentication
// const authenticate = require('./middlewares/authenticate');
// const physAuth = require('./middlewares/physician_authenticate');

app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

router(app);


//app.get('/api/allPatient/:userid', getAll.get_patient); //Call to join //-> Remove if not needed anymore on front-end update



app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});



server.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = server;
