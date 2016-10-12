'use strict'

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
const getAll = require('./controller/allPatient.js');
const Patient = require("./models/patient-helpers");
const MedRecord = require("./models/med_record-helpers.js");

//JWT authentication
const authenticate = require('./middlewares/authenticate');
const physAuth = require('./middlewares/physician_authenticate');
const msgAuth = require('./middlewares/message_authenticate');

//UPLOAD REQUIREMENTS AND STORAGE PATHS

const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');

const storage = require('./storage_paths/document_storage_paths.js')
const uploadProfile = multer({ storage: storage.profile});
const uploadRecords = multer({storage: storage.oldRecords});
const uploadAppointment = multer({storage: storage.appointment});

//

app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());

app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

router(app);


app.post('/api/messages/newmessage', msgAuth, Message.postMessage);
// app.get('/api/messages/:senderType/:userid/:receiverType/:rid', Message.getAllMessages);
app.get('/api/messages/:physid/:patid', Message.getAllMessages_phy_from_pat);
// app.get('/api/messages/patient/:patid/:physid', Message.getAllMessages_pat_from_phy);
app.get('/api/messages/:senderType/:userid/:receiverType/:rid', msgAuth, Message.getAllMessages);
app.get('/api/messages/getOne', Message.getOneMessage);
app.put('/api/messages/edit', Message.editOneMessage);
app.delete('/api/messages/delete', Message.deleteOneMessage);


// FILE UPLOAD PATHS

// photo
  // if one already exists --> delete current
  //upload photo

app.post('/upload/profile_picture/:uid', uploadProfile.single('upload'), authenticate, function(req,res, next){
  let data = {photo_path: `/src/uploads/profile/${req.file.filename}`, uid: req.params.uid};
  Patient.delete_photo(data, (error, result) => {
    if(error) console.log(error);
      Patient.update_photo(data,(err,update)=>{
        if(err) console.log("UPDATE PHOTO ERROR", err);
        res.json(update);
      })
  });
});

// Records
  //upload records

app.post('/upload/old_records/:uid', authenticate, uploadRecords.single('upload'), function(req,res, next){
   req.body.document_path = `/src/uploads/old_records/${req.file.filename}`;
   req.body.uid = req.params.uid;
  MedRecord.upload_document(req.body, (error, result) => {
    if(error) console.log("UPLOAD RECORDS ERROR", error);
    res.json(result);
  })
});

// Appointments
  //upload appointment documents --> not set yet

app.post('/upload/appointment_documents/:uid', authenticate, uploadAppointment.single('upload'), function(req,res, next){
  let data = {photo_path: `/src/uploads/appointment/${req.file.filename}`, uid: req.params.uid};
  Patient.update_appointment(data,(err,data)=>{
      res.json(data);
  })
});


app.get('/api/allPatient/:userid', getAll.get_patient); //Call to the massive join



app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});



server.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = server;
