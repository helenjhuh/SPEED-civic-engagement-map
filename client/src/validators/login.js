import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export default schema;
