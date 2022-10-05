const jwt = require('jsonwebtoken');

function decodeToken(token) {
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = decodeToken;
