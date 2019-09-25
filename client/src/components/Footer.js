import React from "react";
import { SWAT_RED_RGB } from "../defs";

const rootStyles = {
  backgroundColor: SWAT_RED_RGB,
  width: "100%",
  color: "white",
  minheight: "128px",
  paddingTop: "3em",
  paddingBottom: "3em"
};

const Footer = () => (
  <div style={rootStyles}>
    <div className="container">
      <p className="text-center">
        {/* Not sure if this text needs to change or not */}
        Designed by Swarthmore College. All Rights Reserved.
      </p>
    </div>
  </div>
);

export default Footer;
