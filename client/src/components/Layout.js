import React from "react";
import { MainNavbar, Footer } from "./";

const Layout = props => (
  <>
    <MainNavbar />
    <div class="container my-3">{props.children}</div>
    <Footer />
  </>
);

export default Layout;
