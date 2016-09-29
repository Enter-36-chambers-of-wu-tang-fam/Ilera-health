// const gdb = require('../graphDb/graphConnect.js').graphdb;
//
// module.exports = {
//   patient: (params, cb) => {
//     let data = ['CREATE (user:User {params})',
//         'RETURN user',
//     ].join('\n');]
//   }
// };

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
