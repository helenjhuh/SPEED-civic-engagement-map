import Joi from "@hapi/joi";

export default Joi.object().keys({
  address: Joi.string().required()
});
