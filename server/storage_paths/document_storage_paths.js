const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');

module.exports = {
  
  profile: multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './client/src/uploads/profile')
            },
            filename: function (req, file, cb) {
              crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
              });
            }
          }),
  
  oldRecords: multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './client/src/uploads/old_records')
          },
          filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
              cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
          }
        }),

  appointment: multer.diskStorage({
                destination: function (req, file, cb) {
                  cb(null, './client/src/uploads/appointment')
                },
                filename: function (req, file, cb) {
                  crypto.pseudoRandomBytes(16, function (err, raw) {
                    cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
                  });
                }
              }),

}
