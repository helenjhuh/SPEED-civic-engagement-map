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

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first: "",
      last: "",
      email: "",
      college: "",
      password: "",
      password2: ""
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  onFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  signup() {
    // construct the payload
    const payload = {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      college: this.state.college,
      password: this.state.password
    };

    this.props.signup(payload);
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First name" name="first" onChange={this.onFormChange} />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last name" name="last" onChange={this.onFormChange} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" onChange={this.onFormChange} />
          </Form.Group>

          <Form.Group controlId="formCollege">
            <Form.Label>College/University</Form.Label>
            <Form.Control
              type="text"
              placeholder="College or university"
              name="college"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="password2"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.signup}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
