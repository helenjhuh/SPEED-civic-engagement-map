import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home, Faq, About, IMap, Signup, Login } from "./pages";
import { connect } from "react-redux";
import { Layout } from "./components";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedInAs: state.auth.loggedInas
});

const App = ({ isLoggedIn, loggedInAs }) => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={IMap} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default connect(mapStateToProps)(App);
