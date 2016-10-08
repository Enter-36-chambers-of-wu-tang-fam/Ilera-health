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

//Mike's additions --> please don't move yet..need to finish setting up paths

const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads/profile')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage});

//END MIKE ADDITIONS


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

//Record for the photo upload --> Mike Addition

app.post('/upload/profile_picture/:uid', upload.single('upload'), function(req,res, next){
  let data = {photo_path: `/src/uploads/profile/${req.file.filename}`, uid: req.params.uid};
  Patient.update_photo(data,(err,data)=>{
      res.json(data);
  })
})

//Record for the photo upload --> Mike Addition


app.get('/api/allPatient/:userid', getAll.get_patient); //Call to the massive join

app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});

server.listen(3636);
console.log("Server is Doing Big ThIngs You can Now Enter the 36 Chambers of the WU on PORT 3636");

module.exports = server;
