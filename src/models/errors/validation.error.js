const ApplicationError = require('./application.error');

class ValidationError extends ApplicationError {
  constructor(message) {
    super(message || 'Validation error.', 400);
  }
}

module.exports = ValidationError;
