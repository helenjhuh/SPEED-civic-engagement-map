import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { actions } from "../store/actions";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Formik, Field, ErrorMessage } from "formik";
import loginSchema from "../validators/login";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";

const LoginPage = props => {
  const {
    isLoggedIn,
    login,
    clearErrors,
    location,
    loggedInAs,
    authError
  } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async values => {
    const { email, password } = values;
    try {
      setLoading(true);
      const payload = { email, password };
      login(payload);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: ""
  };

  return (
    <Container>
      <h1 className="display-4 mb-4">Login</h1>
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
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="validationFormik01">
              <Form.Label>Email address</Form.Label>
              <Field name="email" type="email" as={FormControl} />
              <ErrorMessage name="email" />
            </Form.Group>

            <Form.Group controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Field name="password" type="password" as={FormControl} />
              <ErrorMessage name="password" />
            </Form.Group>

            <Button size="lg" type="submit" variant="primary">
              Login
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
  login: payload => dispatch(actions.auth.login(payload)),
  clearErrors: () => dispatch(actions.auth.clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
