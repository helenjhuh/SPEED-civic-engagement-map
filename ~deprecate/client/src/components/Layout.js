import React from "react";
import { MainNavbar, Footer } from "./";

const Layout = props => (
  <>
    <MainNavbar />
    <div
      className="container-fluid my-3"
      style={{
        minHeight: "100%"
      }}
    >
      {props.children}
    </div>
    <Footer />
  </>
);

export default Layout;
