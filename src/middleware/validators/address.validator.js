import Joi from "@hapi/joi";

module.exports = Joi.object().keys({
  belongsTo: Joi.string().required(),
  street1: Joi.string(),
  street2: Joi.string(),
  city: Joi.string(),
  region: Joi.string(),
  zip: Joi.string(),
  country: Joi.string(),
  lat: Joi.number()
    .min(-180)
    .max(180),
  lng: Joi.number()
    .min(-90)
    .max(90)
});
