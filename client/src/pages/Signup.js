import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { actions } from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: payload => dispatch(actions.auth.signup(payload)),
  clearErrors: () => dispatch(actions.auth.clearErrors())
});

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

class Signup extends Component {
  constructor() {
    super();
    this.signup = this.signup.bind(this);
  }

  signup(values) {
    // construct the payload
    const payload = {
      first: values.first,
      last: values.last,
      email: values.email,
      college: values.college,
      password: values.password
    };
    this.props.signup(payload);
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 mb-4">Signup</h1>
        {/* if there's an error, display it to the user */}
        {this.props.error && (
          <Alert variant="danger" dismissible onClose={this.props.clearErrors}>
            {this.props.error}
          </Alert>
        )}

        {/* if the user is already logged in, redirect them to the home page */}
        {this.props.isLoggedIn && (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}

        <Formik
          validationSchema={schema}
          onSubmit={this.signup}
          initialValues={{
            first: "",
            last: "",
            email: "",
            college: "",
            password: "",
            password2: ""
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlue,
            values,
            touched,
            isValid,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="first"
                  value={values.first}
                  onChange={handleChange}
                  isInvalid={!touched.first || !!errors.first}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="last"
                  values={values.last}
                  onChange={handleChange}
                  isInvalid={!touched.lsat || !!errors.last}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  values={values.email}
                  onChange={handleChange}
                  isInvalid={!touched.email || !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCollege">
                <Form.Label>College/University</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="College or university"
                  name="college"
                  values={values.college}
                  onChange={handleChange}
                  isInvalid={!touched.college || !!errors.college}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.college}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  values={values.password}
                  onChange={handleChange}
                  isInvalid={!touched.password || !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="password2"
                  values={values.password2}
                  onChange={handleChange}
                  isInvalid={!touched.password2 || !!errors.password2}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match!
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                size="lg"
                variant="primary"
                disabled={!isValid}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
