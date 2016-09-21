const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../db/dbConnect/connection.js');

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());


app.listen(3636);
console.log("Server is Doing Big Thangs on Chamber 3636");

module.exports = app;
