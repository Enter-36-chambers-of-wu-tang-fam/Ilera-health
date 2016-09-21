const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:''
});

dbConnection.connect(function(err){
  if(err){
    console.error("Did Not connect to the Database so FiX it");
  }
  console.log("Connected to the Database and as a result you have received a Wu Tang stamp of approval");
})

module.exports = dbConnection;
