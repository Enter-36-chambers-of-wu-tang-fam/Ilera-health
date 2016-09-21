const bcrypt = require("bcrypt-nodejs");
const Promise = require("bluebird");

module.exports = {};

module.exports.hashPassword = pwd => {
  return new Promise(
    (resolve, reject)=>{
      bcrypt.genSalt(10, (err, salt)=>{
        if(err){
          reject(err)
        }
        bcrypt.hash(pwd, salt, null, (err, hash)=>{
          if(err){
            reject(err)
          }
          resolve(hash);
        })
      })
    }
  )
};
