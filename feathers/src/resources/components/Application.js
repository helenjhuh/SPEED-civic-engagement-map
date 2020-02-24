import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import Container from "react-bootstrap/Container";
import Overlay from "react-bootstrap/Overlay";
import Alert from "react-bootstrap/Alert";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import feathers, { services } from "../feathers";

const TYPE_LOGIN_MODAL = "TYPE_LOGIN_MODAL";
const TYPE_SIGNUP_MODAL = "TYPE_SIGNUP_MODAL";

// bootstrap contexts
const SUCCESS = "success";
const DANGER = "danger";
const INFO = "info";

const TYPE_ERROR_ALERT = "TYPE_ERROR_ALERT";
const TYPE_SUCCESS_ALERT = "TYPE_SUCCESS_ALERT";

const Application = props => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const ref = useRef(null);

  const showLoginForm = () => {
    setShowModal(true);
    setModalType(TYPE_LOGIN_MODAL);
  };

  const showSignupForm = () => {
    setShowModal(true);
    setModalType(TYPE_SIGNUP_MODAL);
  };

  const closeModals = () => {
    setShowModal(false);
    setModalType(null);
  };

  const clearAlerts = () => {
    setAlertText("");
    setAlertType("");
  };

  const handleLoginClick = () => {
    showLoginForm();
  };

  const handleSignupClick = () => {
    showSignupForm();
  };

  const handleLogoutClick = () => {
    closeModals();
    logout();
  };

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const payload = { strategy: "local", email, password };
      const res = await feathers.authenticate(payload);

      setAlertText("Logged in!");
      setAlertType(SUCCESS);
      setUser(res.user);
      setToken(res.accessToken);
    } catch (error) {
      setAlertText(error.message);
      setAlertType(DANGER);
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ first, last, email, college, password }) => {
    try {
      setLoading(true);
      const payload = { first, last, email, college, password };
      await services.users.create(payload);
      setAlertText("You can not login to your account");
      setAlertType(SUCCESS);
    } catch (error) {
      setAlertText(error.message);
      setAlertType(DANGER);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await feathers.logout();
  };

  return (
    <div id="Application">
      <Router>
        <MainNavbar
          onLogoutClick={handleLogoutClick}
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          loggedIn={token && user}
        />

        <Container className="mt-3">
          {alertText && (
            <Alert variant={alertType} dismissible onClose={clearAlerts}>
              {alertText}
            </Alert>
          )}
        </Container>

        <Switch>
          <Route exact path="/">
            <Container>
              <p>Home</p>
            </Container>
          </Route>
        </Switch>

        <Overlay
          container={ref.current}
          show={modalType === TYPE_LOGIN_MODAL && showModal}
          placement="right"
          onHide={() => closeModals()}
          rootClose={true}
        >
          {({
            placement,
            scheduleUpdate,
            arrowProps,
            outOfBoundaries,
            show: _show,
            ...props
          }) => (
            <div
              {...props}
              style={{
                padding: "10px",
                borderRadius: 2,
                zIndex: 9999,
                ...props.style
              }}
            >
              <LoginCard handleSubmit={login} />
            </div>
          )}
        </Overlay>

        <Overlay
          container={ref.current}
          show={modalType === TYPE_SIGNUP_MODAL && showModal}
          placement="right"
          onHide={() => closeModals()}
          rootClose={true}
        >
          {({
            placement,
            scheduleUpdate,
            arrowProps,
            outOfBoundaries,
            show: _show,
            ...props
          }) => (
            <div
              {...props}
              style={{
                padding: "10px",
                borderRadius: 2,
                zIndex: 9999,
                ...props.style
              }}
            >
              <SignupCard handleSubmit={signup} />
            </div>
          )}
        </Overlay>
      </Router>
    </div>
  );
};

export default Application;
