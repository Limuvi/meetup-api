const errorHandler = require('./error-handler.middleware');
const tokenHandler = require('./token-handler.middleware');
const validator = require('./validator.middleware');

module.exports = {
  errorHandler,
  validator,
  tokenHandler,
};
