import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required()
});

const RoleForm = props => {
  const { role, handleSubmit } = props;
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={role}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formik_name">
            <Form.Label>Name</Form.Label>
            <Field name="name" type="text" as={Form.Control} />
            <ErrorMessage name="name" className="text-danger" component="p" />
          </Form.Group>
          <Form.Group controlId="formik_description">
            <Form.Label>Description</Form.Label>
            <Field name="description" type="text" as={Form.Control} />
            <ErrorMessage
              name="description"
              className="text-danger"
              component="p"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RoleForm;
