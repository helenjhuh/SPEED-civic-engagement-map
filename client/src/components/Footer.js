import React from "react";
import { SWAT_RED_RGB } from "../defs";

const rootStyles = {
  backgroundColor: SWAT_RED_RGB,
  position: "absolute",
  bottom: 0,
  width: "100%",
  marginTop: "3em",
  color: "white",
  height: "128px",
  paddingTop: "3em"
};

const Footer = () => (
  <div style={rootStyles}>
    <div className="container">
      <p className="text-center">
        Designed by Swarthmore College, Steven Fernandez. All Rights Reserved.
      </p>
    </div>
  </div>
);

export default Footer;
