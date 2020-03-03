const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  address: Joi.string().required()
});
