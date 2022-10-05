const jwt = require('jsonwebtoken');

function generateToken(payload, expiresIn) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return `Bearer ${token}`;
}

module.exports = generateToken;
