import React from "react";
import PropTypes from "prop-types";
import { SWAT_RED_RGB } from "../defs";

const rootStyles = {};
const leftStyles = {};
const rightStyles = {};

const FeaturedProject = props => {
  return (
    <div className="row" style={rootStyles}>
      <div className="col-sm" style={leftStyles}>
        <h2>{props.title}</h2>
      </div>
      <div className="col-sm" style={rightStyles}>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

FeaturedProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired
};

export default FeaturedProject;
