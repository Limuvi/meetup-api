const Joi = require('joi');

const meetupParamsSchema = Joi.object({
  limit: Joi.number().greater(0),
  page: Joi.number().greater(0),
  sortBy: Joi.string(),
  orderBy: Joi.string().valid('asc', 'desc'),
  startDate: Joi.date(),
  endDate: Joi.date(),
  title: Joi.string(),
  location: Joi.string(),
  tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  date: Joi.date(),
});

module.exports = meetupParamsSchema;
