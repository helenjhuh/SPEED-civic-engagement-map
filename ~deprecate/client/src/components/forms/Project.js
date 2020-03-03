import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import validationSchema from "../../validators/project";
import CustomSelectMultiple from "../CustomSelectMultiple";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {
  projectTypes,
  projectIssues,
  projectGrants
} from "../../selectOptions";

const ProjectForm = props => {
  const { onSubmit, initialValues, children } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formik01">
            <Form.Label>Project name</Form.Label>
            <Field name="name" type="name" as={FormControl} />
            <ErrorMessage name="email" />
          </Form.Group>

          <Form.Group id="formik02">
            <Form.Label>Project description</Form.Label>
            <Field name="description" type="text" as={FormControl} />
            <ErrorMessage name="description" />
          </Form.Group>

          <Form.Group controlId="formik03">
            <Form.Label>Project type (Select all that apply)</Form.Label>
            <Field
              component={CustomSelectMultiple}
              options={projectTypes}
              isMulti
              name="type"
            />
            <ErrorMessage name="type" />
          </Form.Group>

          <Form.Group controlId="formik04">
            <Form.Label>Project Issue (Select all that apply)</Form.Label>
            <Field
              component={CustomSelectMultiple}
              options={projectIssues}
              isMulti
              name="issue"
            />
          </Form.Group>

          <Form.Group controlId="formik05">
            <Form.Label>
              Lang Center Grants and Awards (Select all that apply)
            </Form.Label>
            <Field
              component={CustomSelectMultiple}
              options={projectGrants}
              isMulti
              name="langGrants"
            />
          </Form.Group>

          <Form.Group controlId="formik06">
            <Form.Label>Funders (create as many as needed)</Form.Label>
            <Field name="funders" type="number" as={FormControl} />
            <ErrorMessage name="funders" />
          </Form.Group>

          <Form.Group controlId="formik07">
            <Form.Label>Beneficiaries (please enter appx. number)</Form.Label>
            <Field name="beneficiaries" type="number" as={FormControl} />
            <ErrorMessage name="beneficiaries" />
          </Form.Group>

          <Form.Group id="formik08">
            <Form.Label>Project website</Form.Label>
            <Field name="website" type="text" as={FormControl} />
            <ErrorMessage name="website" />
          </Form.Group>

          <h2>Address Information</h2>

          <Form.Group id="formik09">
            <Form.Label>Street 1</Form.Label>
            <Field name="street1" type="text" as={FormControl} />
            <ErrorMessage name="street1" />
          </Form.Group>

          <Form.Group id="formik10">
            <Form.Label>Street 2</Form.Label>
            <Field name="street2" type="text" as={FormControl} />
            <ErrorMessage name="street2" />
          </Form.Group>

          <Form.Group id="formik11">
            <Form.Label>City</Form.Label>
            <Field name="city" type="text" as={FormControl} />
            <ErrorMessage name="city" />
          </Form.Group>

          <Form.Group id="formik12">
            <Form.Label>Region</Form.Label>
            <Field name="region" type="text" as={FormControl} />
            <ErrorMessage name="region" />
          </Form.Group>

          <Form.Group id="formik13">
            <Form.Label>Zip</Form.Label>
            <Field name="zip" type="text" as={FormControl} />
            <ErrorMessage name="zip" />
          </Form.Group>

          <Form.Group id="formik14">
            <Form.Label>Country</Form.Label>
            <Field name="country" type="text" as={FormControl} />
            <ErrorMessage name="country" />
          </Form.Group>

          {children}

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

ProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
};

export default ProjectForm;
