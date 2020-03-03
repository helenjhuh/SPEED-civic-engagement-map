import * as yup from "yup";

const schema = yup.object({
  first: yup.string().required(),
  last: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  college: yup.string().required(),
  password: yup.string().required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required()
});

export default schema;
