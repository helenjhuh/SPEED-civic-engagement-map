import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { actions } from "../store/actions";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actions.auth.login(payload))
});

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  login(values) {
    // construct the payload
    const payload = {
      email: values.email,
      password: values.password
    };
    this.props.login(payload);
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 mb-4">Login</h1>
        {/* if there's an error, display it to the user */}
        {this.props.error && <p className="error">{this.props.error}</p>}

        {/* if the user is already logged in, redirect them to the home page */}
        {this.props.isLoggedIn && (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}

        <Formik
          validationSchema={schema}
          onSubmit={this.login}
          initialValues={{ email: "", password: "" }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={errors.length > 0}
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
)(Login);
