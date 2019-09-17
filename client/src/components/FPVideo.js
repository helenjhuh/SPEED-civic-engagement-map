import React from "react";
import PropTypes from "prop-types";

const FPVideo = props => {
  return (
    <iframe
      width="560"
      height="315"
      src={props.url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

FPVideo.propTypes = {
  url: PropTypes.string.isRequired
};

export default FPVideo;
