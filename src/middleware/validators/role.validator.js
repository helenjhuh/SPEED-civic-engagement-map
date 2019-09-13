import Joi from "@hapi/joi";

export default Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});
