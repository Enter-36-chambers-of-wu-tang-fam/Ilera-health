const gdb = require('../graphDb/graphConnect.js').graphdb;
//
module.exports = {
  signUp: function(req, res){
      gdb
        .run('CREATE(n:patient {first:{parfirst}, last:{parlast}, email:{paremail}, password:{parpassword}}) RETURN n', {parfirst:req.body.first, parlast:req.body.last, paremail:req.body.email, parpassword:req.body.password})
        .then((patient)=>{
          console.log(patient);
          gdb.close();
        })
        .catch((err)=>{
          console.log(err);
        })
    }
};

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


// session
//   .run("Then will cause a syntax error")
//   .catch( function(err) {
//     expect(err.fields[0].code).toBe( "Neo.ClientError.Statement.SyntaxError" );
//     done();
//   });


// models
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
// signUp: (req, res) => {
//   Patient.checkPatient(req.body,(error,data)=> {
//
//     if(error){ console.log(error);}
//
//     if(data.length > 0){
//       res.status(409).send("The email address you specified is already in use.");
//     } else {
//       hashHelp.hashPassword(req.body.password)
//       .then(hashed=>{
//         req.body.password = hashed;
//
//         Patient.signUp(req.body, (error, data) => {
//           if(error) console.log(error);
//           sess = req.session;
//           sess.email = req.body.email;
//           sess.patient = data;
//           module.exports.sess = sess;
//           res.json(data.insertId);
//         });
//       })
//     }
//   });
// }
