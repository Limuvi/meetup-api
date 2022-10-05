const CryptoJS = require('crypto-js');

function hashPassword(password) {
  return CryptoJS.SHA512(password).toString();
}

module.exports = hashPassword;
