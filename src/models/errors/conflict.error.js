const ApplicationError = require('./application.error');

class ConflictError extends ApplicationError {
  constructor(message) {
    super(message || 'Conflict error', 409);
  }
}

module.exports = ConflictError;
