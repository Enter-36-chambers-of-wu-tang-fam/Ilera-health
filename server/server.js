const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('session');
const db = require('../db/dbConnect/connection.js');

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());


app.use(session({
  secret: 'Welcome to the 36 chambers',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.listen(3636);
console.log("Server is Doing Big Thangs on Chamber 3636");

module.exports = app;
