import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

const initialValues = {
  email: "",
  password: ""
};

const LoginForm = props => {
  const { handleSubmit } = props;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formik_email">
            <Form.Label>Email address</Form.Label>
            <Field name="email" type="email" as={Form.Control} />
            <ErrorMessage name="email" className="text-danger" component="p" />
          </Form.Group>

          <Form.Group controlId="formik_password">
            <Form.Label>Password</Form.Label>
            <Field name="password" type="password" as={Form.Control} />
            <ErrorMessage
              name="password"
              className="text-danger"
              component="p"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
