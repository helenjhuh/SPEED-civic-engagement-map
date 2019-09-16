import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { actions } from "../store/actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: payload => dispatch(actions.auth.signup(payload))
});

const Signup = props => {
  return (
    <div>
      <Form>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First name" />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="formCollege">
          <Form.Label>College/University</Form.Label>
          <Form.Control type="text" placeholder="College or university" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm your password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
