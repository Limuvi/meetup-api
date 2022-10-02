const Joi = require('joi');

const meetupSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string()).required(),
  date: Joi.date().min('now').required(),
  location: Joi.string().min(1).required().required(),
});

module.exports = meetupSchema;
