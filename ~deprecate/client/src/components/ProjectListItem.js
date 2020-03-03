import React from "react";
import PropTypes from "prop-types";

const ProjectListItem = ({ project }) => {
  return <div className=""></div>;
};

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
    website: PropTypes.string,
    pins: PropTypes.array
  }).isRequired
};

export default ProjectListItem;
