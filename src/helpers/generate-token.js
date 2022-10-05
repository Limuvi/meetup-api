const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

function generateToken(payload, expiresIn) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  return token;
}

module.exports = generateToken;
