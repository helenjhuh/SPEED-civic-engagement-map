import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import CustomSelectMultiple from '../CustomSelectMultiple';
import {
    projectGrants,
    projectIssues,
    projectTypes
} from '../../selectOptions';

const validationSchema = yup.object({
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

const ProjectForm = props => {
    const { project, handleSubmit } = props;
    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={project}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>

                    <Form.Group controlId="formik_name">
                        <Form.Label>Project name</Form.Label>
                        <Field name="name" type="name" as={Form.Control} />
                        <ErrorMessage name="name" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group id="formik_description">
                        <Form.Label>Project description</Form.Label>
                        <Field name="description" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="description"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group controlId="formik_type">
                        <Form.Label>Project type (Select all that apply)</Form.Label>
                        <Field
                            component={CustomSelectMultiple}
                            options={projectTypes}
                            isMulti
                            name="types"
                        />
                        <ErrorMessage name="type" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group controlId="formik_issues">
                        <Form.Label>Project Issue (Select all that apply)</Form.Label>
                        <Field
                            component={CustomSelectMultiple}
                            options={projectIssues}
                            isMulti
                            name="issues"
                        />
                        <ErrorMessage name="type" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group controlId="formik_langGrants">
                        <Form.Label>
              Lang Center Grants and Awards (Select all that apply)
                        </Form.Label>
                        <Field
                            component={CustomSelectMultiple}
                            options={projectGrants}
                            isMulti
                            name="langGrants"
                        />
                        <ErrorMessage
                            name="langGrants"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group controlId="formik_funders">
                        <Form.Label>Funders (create as many as needed)</Form.Label>
                        <Field name="funders" type="number" as={Form.Control} />
                        <ErrorMessage
                            name="funders"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group controlId="formik_beneficiaries">
                        <Form.Label>Beneficiaries (please enter appx. number)</Form.Label>
                        <Field name="beneficiaries" type="number" as={Form.Control} />
                        <ErrorMessage
                            name="beneficiaries"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group id="formik_website">
                        <Form.Label>Project website</Form.Label>
                        <Field name="website" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="website"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <h2>Address Information</h2>

                    <Form.Group id="formik_street1">
                        <Form.Label>Street 1</Form.Label>
                        <Field name="street1" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="street1"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group id="formik_street2">
                        <Form.Label>Street 2</Form.Label>
                        <Field name="street2" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="street2"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group id="formik_city">
                        <Form.Label>City</Form.Label>
                        <Field name="city" type="text" as={Form.Control} />
                        <ErrorMessage name="city" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group id="formik_region">
                        <Form.Label>Region</Form.Label>
                        <Field name="region" type="text" as={Form.Control} />
                        <ErrorMessage name="region" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group id="formik_zip">
                        <Form.Label>Zip</Form.Label>
                        <Field name="zip" type="text" as={Form.Control} />
                        <ErrorMessage name="zip" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group id="formik14">
                        <Form.Label>Country</Form.Label>
                        <Field name="country" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="country"
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

export default ProjectForm;
