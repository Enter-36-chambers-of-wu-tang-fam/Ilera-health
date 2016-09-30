const gdb = require('../graphDb/graphConnect.js').graphdb;
// const Promise = require("bluebird");
const bcrypt = require("bcrypt-nodejs");
const hashHelp = require('../security/hash.js');

// var sess;

module.exports = {
  // signUp: function(req, res){
  //     gdb
  //       .run('CREATE(n:patient {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN n', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
  //       .then((patient)=>{
  //         console.log(patient);
  //         gdb.close();
  //       })
  //       .catch((err)=>{
  //         console.log(err);
  //       })
  //   }

  // make sure there are no duplicates
  signUp: (req, res) => {
    gdb
    .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n', {paremail:req.body.email })
    .then(function(data){
        res.status(409).send("The email address you specified is already in use.");
        console.log(data);
        gdb.close();
    })
    .catch((err)=>{
      console.log(err)
      hashHelp.hashPassword(req.body.password)
      .then(hashed =>{
        req.body.password = hashed;
        gdb
          .run('CREATE(n:patient {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN n', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
          .then((patient)=>{
            console.log(patient);
            gdb.close();
          })
          // .catch((err)=>{
          //   console.log(err);
          // })
      })
    })
    // hashHelp.hashPassword(req.body.password)
    // .then(hashed =>{
    //   req.body.password = hashed;
    //   gdb
    //     .run('CREATE(n:patient {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN n', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
    //     .then((patient)=>{
    //       console.log(patient);
    //       gdb.close();
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     })
    // })
  },

  signIn: (req, res) => {
    var passwordz = req.body.password;
    gdb
// records._fields.pasword
      .run('MATCH (n:patient) WHERE n.email={paremail} RETURN n', {paremail:req.body.email })
      .then((data)=>{
        console.log(data, data.records[0]._fields[0].properties.email);
        bcrypt.compare(passwordz, data.records[0]._fields[0].properties.password, (error, result) => {
          if(result){
            var sess = req.session;
            sess.email = 'sourjam@gmail.com';
            sess.patient = data.records[0]._fields[0].identity.low;
            module.exports.sess = sess;
            res.json(data.records[0]._fields[0].identity.low);
          }
          // else {
          //   res.status(401).send("That email and/or password was not found");
          // }
        })
        // gdb.close();
      })
      .catch((err)=>{
        console.log(err);
      })
    // bcrypt.compare(req.body.password, data[0].password, (error, result) => {
    //   if(result){
    //     sess = req.session;
    //     sess.email = data[0].email;
    //     sess.patient = data[0].id;
    //     module.exports.sess = sess;
    //     res.json(data[0].id);
    //   } else {
    //     res.status(401).send("That email and/or password was not found");
    //   }
    // }

  }

};
// signIn: (req, res) => {
//   Patient.signIn(req.body, (error, data) => {
//     if(data.length > 0){
//       bcrypt.compare(req.body.password, data[0].password, (error, result) => {
//         if(result){
//           sess = req.session;
//           sess.email = data[0].email;
//           sess.patient = data[0].id;
//           module.exports.sess = sess;
//           res.json(data[0].id);
//         } else{
//           res.status(401).send("That email and/or password was not found");
//         }
//       })
//     } else {
//       res.status(401).send("That email and/or password was not found");
//     }
//   })
// },

signUp: (req, res) => {
  Patient.checkPatient(req.body,(error,data)=> {

    if(error){ console.log(error);}

    if(data.length > 0){
      res.status(409).send("The email address you specified is already in use.");
    } else {
      hashHelp.hashPassword(req.body.password)
      .then(hashed=>{
        req.body.password = hashed;

        Patient.signUp(req.body, (error, data) => {
          if(error) console.log(error);
          sess = req.session;
          sess.email = req.body.email;
          sess.patient = data;
          module.exports.sess = sess;
          res.json(data.insertId);
        });
      })
    }
  });
}


// session
//   .run("Then will cause a syntax error")
//   .catch( function(err) {
//     expect(err.fields[0].code).toBe( "Neo.ClientError.Statement.SyntaxError" );
//     done();
//   });


// models

// signIn: (params, cb) => {
//   let data = [params.email];
//   const queryString = 'SELECT * FROM staff WHERE email =? LIMIT 1';
//   db.query(queryString, data, (error, results) => cb(error, results) );
// },
// signUp: (params, cb) => {
//   let data = [params.first, params.last, params.email, params.password];
//   const queryString = "INSERT INTO patient (first, last, email, password) \
//     VALUES (?,?,?,?)";
//   db.query(queryString, data, (error, results) => cb(error, results) );
// },
//
// checkPatient: (params, cb) => {
//   let data = [params.email];
//   const queryString = "SELECT * FROM patient WHERE email=? LIMIT 1";
//   db.query(queryString, data, (error, results) => cb(error, results) );
// }
// controller

// `id` INTEGER NOT NULL AUTO_INCREMENT,
// `first` VARCHAR(30) NULL DEFAULT NULL,
// `last` VARCHAR(30) NULL DEFAULT NULL,
// `email` VARCHAR(30) NOT NULL,
// `password` VARCHAR(300) NULL DEFAULT NULL,
// `pin` INTEGER(4) NULL DEFAULT NULL,
// `date_of_birth` DATE NULL DEFAULT NULL,
// `address` VARCHAR(60) NULL DEFAULT NULL,
// `city` VARCHAR(60) NULL DEFAULT NULL,
// `state` VARCHAR(2) NULL DEFAULT NULL,
// `zip` VARCHAR(10) NULL DEFAULT NULL,
// `phone_number` VARCHAR(20) NULL DEFAULT NULL,
// `weight` INTEGER NULL DEFAULT NULL,
// `height` INTEGER NULL DEFAULT NULL,
// `blood_type` VARCHAR(3) NULL DEFAULT NULL,
// `photo_path` VARCHAR(200) NULL DEFAULT NULL,
// PRIMARY KEY (`id`)
