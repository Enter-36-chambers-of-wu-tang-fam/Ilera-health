const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const db = require('../db/dbConnect/connection.js');
const path = require('path');

// this was just to test that the server worked feel free to delete

app.use(express.static(__dirname + '/../client'));


app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));


// Post Request to: api/user/signup  =>   { Patient Table}
// app.post('/api/user/signup', something);

// Post request to: /api/user/emergency_contacts => { Emergency Table }
// app.post('/api/user/emergency_contacts', Emergency Table);
// Post Request To: api/user/insurance => { insurance }
// app.post('/api/user/insurance', something);

// Post Request To: /api/physician/signup i think this is a guess
// app.post('/api/physician/signup', something);

//  post to health_log
// app.post('/api/health_log', something);

// Get Request → /api/healthlog/:physid/:patid  [ limit 5]
// app.get('/api/healthlog/:physid/:patid', something);
// Get Request → /api/patient_physician/:physicianid  [limit 5] =>  { patient_physician }
// app.get('/api/patient_physician/:physicianid', something);
// Get Request → /api/messages/:physid/:patid  [limit 5]
// app.get('/api/messages/:physid/:patid', somehting);


// INSERTED TEMPORARLILY TO TEST OUT ROUTING ON FRONT END
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/../client/'))
  })

app.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = app;
