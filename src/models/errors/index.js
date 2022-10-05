const ApplicationError = require('./application.error');
const NotFoundError = require('./not-found.error');
const ValidationError = require('./validation.error');
const ConflictError = require('./conflict.error');
const UnauthorizedError = require('./unauthorized.error');
const ForbiddenError = require('./forbidden.error');

module.exports = {
  ApplicationError,
  NotFoundError,
  ValidationError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
};
