const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string(),
  website: Joi.string(),
  owner: Joi.string().required(),
  address: Joi.string().required(),
  pins: Joi.array().items(Joi.string().required())
});
