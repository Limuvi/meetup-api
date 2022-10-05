const errorHandler = require('./error-handler.middleware');
const checkRole = require('./roles-handler.middleware');
const tokenHandler = require('./token-handler.middleware');
const validate = require('./validator.middleware');

module.exports = {
  errorHandler,
  validate,
  tokenHandler,
  checkRole,
};
