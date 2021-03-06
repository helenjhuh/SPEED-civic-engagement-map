import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Home,
  Faq,
  About,
  IMap,
  Signup,
  Login,
  AddProject,
  MyProjects,
  SingleProject,
  Account,
  ManageUsers,
  ManageRoles,
  ManageProjects
} from "./pages";
import { connect } from "react-redux";
import { Layout, AuthRoute } from "./components";

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
          <Route path="/map" component={IMap} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <AuthRoute path="/projects/add" component={AddProject} />
          <AuthRoute path="/my/projects" component={MyProjects} />
          <AuthRoute path="/my/account" component={Account} />
          <AuthRoute path="/manage/users" component={ManageUsers} />
          <AuthRoute path="/manage/projects" component={ManageProjects} />
          <AuthRoute path="/manage/roles" component={ManageRoles} />
          <Route path="/projects/:id" component={SingleProject} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default connect(mapStateToProps)(App);
