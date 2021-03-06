const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  first: Joi.string()
    .min(2)
    .max(64)
    .required(),
  last: Joi.string()
    .min(2)
    .max(64),
  college: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  projects: Joi.array().items(Joi.string()),
  address: Joi.string(),
  roles: Joi.array().items(Joi.string())
});
