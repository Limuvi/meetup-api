const ApplicationError = require('./application.error');

class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(message || 'Forbidden. You do not have a permission.', 403);
  }
}

module.exports = ForbiddenError;
