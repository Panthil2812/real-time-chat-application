const Joi = require(`joi`);

module.exports = {
  string: Joi.string().trim().min(0),
  reqstring: Joi.string().trim().required(),
  number: Joi.number(),
  reqnumber: Joi.number().required(),
  array: Joi.array(),
  reqarray: Joi.array().required(),
};
