import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  website: yup.string(),
  street1: yup.string(),
  street2: yup.string(),
  city: yup.string(),
  region: yup.string(),
  zip: yup.string(),
  country: yup.string()
});

export default schema;
