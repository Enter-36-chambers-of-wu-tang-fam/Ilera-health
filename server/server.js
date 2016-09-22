const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const db = require('../db/dbConnect/connection.js');
const path = require('path');

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());


app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// INSERTED TEMPORARLILY TO TEST OUT ROUTING ON FRONT END
app.get('/*', (req,res) => {
    res.sendfile(path.join(__dirname, '../index.html'))
  })

app.listen(3636);
console.log("Server is Doing Big Thangs on Chamber 3636");

module.exports = app;
