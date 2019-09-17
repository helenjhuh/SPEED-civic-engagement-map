import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInAs
});

const MainNavbar = ({ isLoggedIn, loggedInAs }) => {
  return (
    <Navbar bg="light" expand="lg">
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
        </Nav>
        {/* Only show these links of the user is not authed */}
        {!isLoggedIn && (
          <>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
          </>
        )}

        {/* Only show these links if the user is authed */}
        {isLoggedIn && (
          <>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <LinkContainer to="/projects/new">
                <NavDropdown.Item>Add project</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/projects/my">
                <NavDropdown.Item>My projects</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/account">
              <Nav.Link>Manage account</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps)(MainNavbar);
