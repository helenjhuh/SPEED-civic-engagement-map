import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import CustomSelectMultiple from '../CustomSelectMultiple';

const validationSchema = yup.object({
    first: yup.string().required(),
    last: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    college: yup.string(),
    password: yup.string().required(),
    password2: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required()
});

const permissionOpts = [
    { name: 'Admin', value: 'Admin', label: 'Admin' },
    { name: 'Editor', value: 'Editor', label: 'Editor' },
    { name: 'User', value: 'User', label: 'User' }
];

const UserForm = props => {
    const { user, handleSubmit } = props;

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={user}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formik_first">
                        <Form.Label>First Name</Form.Label>
                        <Field name="first" type="text" as={Form.Control} />
                        <ErrorMessage name="first" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group controlId="formik_last">
                        <Form.Label>Last Name</Form.Label>
                        <Field name="last" type="text" as={Form.Control} />
                        <ErrorMessage name="last" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group controlId="formik_email">
                        <Form.Label>Email</Form.Label>
                        <Field name="email" type="email" as={Form.Control} />
                        <ErrorMessage name="email" className="text-danger" component="p" />
                    </Form.Group>

                    <Form.Group controlId="formik_college">
                        <Form.Label>College/University</Form.Label>
                        <Field name="college" type="text" as={Form.Control} />
                        <ErrorMessage
                            name="college"
                            className="text-danger"
                            component="p"
                        />
                    </Form.Group>

                    <Form.Group controlId="formik_permissions">
                        <Form.Label>Permissions</Form.Label>
                        <Field
                            component={CustomSelectMultiple}
                            options={permissionOpts}
                            isMulti
                            isCreatable
                            name="permissions"
                        />
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

                    <Form.Group controlId="formik_password2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Field name="password2" type="password" as={Form.Control} />
                        <ErrorMessage
                            name="password2"
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

export default UserForm;
