const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

function decodeToken(token) {
  const decoded = jwt.decode(token, JWT_SECRET);
  return decoded;
}

module.exports = decodeToken;
