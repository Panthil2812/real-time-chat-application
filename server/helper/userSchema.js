const validate = require(`./joiValidation`);
const Joi = require(`joi`);
module.exports = {
  signInuserSchemas: Joi.object().keys({
    email: validate.reqstring,
    password: validate.reqstring,
  }),
  userSchemas: Joi.object().keys({
    username: validate.reqstring,
    email: validate.reqstring,
    password: validate.reqstring,
  }),
  getMessageSchema: Joi.object().keys({
    from: validate.reqstring,
    to: validate.reqstring,
  }),
  addMessageSchema: Joi.object().keys({
    from: validate.reqstring,
    to: validate.reqstring,
    message: validate.reqstring,
  }),
};
