import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { actions } from "../store/actions";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actions.auth.login(payload))
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  login(e) {
    e.preventDefault();
    // construct the payload
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(payload);
  }

  render() {
    return (
      <div>
        {/* if there's an error, display it to the user */}
        {this.props.error && <p className="error">{this.props.error}</p>}

        {/* if the user is already logged in, redirect them to the home page */}
        {this.props.isLoggedIn && (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        )}

        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
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

          <Button variant="primary" onClick={this.login}>
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
)(Login);
