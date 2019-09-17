import React from "react";
import { MainNavbar, Footer } from "./";

const Layout = props => (
  <>
    <MainNavbar />
    <div className="container my-3">{props.children}</div>
    <Footer />
  </>
);

export default Layout;
