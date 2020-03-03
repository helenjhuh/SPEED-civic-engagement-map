import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { actions } from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import signupSchema from "../validators/signup";
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";

const SignupPage = props => {
  const {
    signup,
    authError,
    isLoggedIn,
    loggedInAs,
    clearErrors,
    location
  } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = ({ first, last, email, college, password }) => {
    try {
      setLoading(true);
      const payload = {
        first,
        last,
        email,
        college,
        password
      };
      signup(payload);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    first: "",
    last: "",
    email: "",
    college: "",
    password: "",
    password2: ""
  };

  return (
    <Container>
      <h1 className="display-4 mb-4">Signup</h1>

      {/* if there's an error, display it to the user */}
      {authError && (
        <Alert variant="danger" dismissible onClose={clearErrors}>
          {authError}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={clearErrors}>
          {error}
        </Alert>
      )}

      {/* if the user is already logged in, redirect them to the home page */}
      {isLoggedIn && (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}

      <Formik
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formik01">
              <Form.Label>First Name</Form.Label>
              <Field name="first" type="text" as={FormControl} />
              <ErrorMessage name="first" />
            </Form.Group>

            <Form.Group controlId="formik02">
              <Form.Label>Last Name</Form.Label>
              <Field name="last" type="text" as={FormControl} />
              <ErrorMessage name="last" />
            </Form.Group>

            <Form.Group controlId="formik03">
              <Form.Label>Email</Form.Label>
              <Field name="email" type="email" as={FormControl} />
              <ErrorMessage name="email" />
            </Form.Group>

            <Form.Group controlId="formik04">
              <Form.Label>College/University</Form.Label>
              <Field name="college" type="text" as={FormControl} />
              <ErrorMessage name="email" />
            </Form.Group>

            <Form.Group controlId="formik04">
              <Form.Label>Password</Form.Label>
              <Field name="password" type="password" as={FormControl} />
              <ErrorMessage name="password" />
            </Form.Group>

            <Form.Group controlId="formik05">
              <Form.Label>Password</Form.Label>
              <Field name="password2" type="password2" as={FormControl} />
              <ErrorMessage name="password2" />
            </Form.Group>

            <Button size="lg" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs,
  authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: payload => dispatch(actions.auth.signup(payload)),
  clearErrors: () => dispatch(actions.auth.clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
