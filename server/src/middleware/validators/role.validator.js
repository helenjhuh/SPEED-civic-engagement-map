const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});
