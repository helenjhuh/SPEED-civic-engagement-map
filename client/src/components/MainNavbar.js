import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs
});

const MainNavbar = ({ isLoggedIn, loggedInAs }) => {
  return (
    <Navbar bg="light" expand="lg" className="container">
      <LinkContainer to="/">
        <Navbar.Brand href="/">Swarthmore</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/faq">
            <Nav.Link>F.A.Q.</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/map">
            <Nav.Link>View map</Nav.Link>
          </LinkContainer>
          {/* Only show these links of the user is not authed */}
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>Signup</Nav.Link>
          </LinkContainer>
          {/* Only show these links if the user is authed */}
          <LinkContainer to="/projects/new">
            <Nav.Link>Add a project</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/account">
            <Nav.Link>Manage account</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/logout">
            <Nav.Link>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps)(MainNavbar);
