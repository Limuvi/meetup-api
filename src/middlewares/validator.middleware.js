const { ValidationError } = require('../models/errors');

module.exports = (scheme, reqPart = 'body') => async (req, res, next) => {
  try {
    const validated = await scheme.validateAsync(req[reqPart], { abortEarly: false });
    req[reqPart] = validated;
    return next();
  } catch (error) {
    const details = error.details.map(({ message }) => message.replaceAll('"', ''));
    return next(new ValidationError(details));
  }
};
