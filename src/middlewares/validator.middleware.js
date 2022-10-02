const { ValidationError } = require('../models/errors');

module.exports = function (scheme) {
  return async function (req, res, next) {
    try {
      const validated = await scheme.validateAsync(req.body, { abortEarly: false });
      req.body = validated;
      return next();
    } catch (error) {
      const details = error.details.map(({ message }) => message.replaceAll('"', ''));
      return next(new ValidationError(details));
    }
  };
};
