import React from "react";
import PropTypes from "prop-types";

const FPVideo = props => {
  return (
    <iframe
      src={props.url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        display: "block",
        width: "100%",
        height: "90vh",
        margin: "16px auto"
      }}
    ></iframe>
  );
};

FPVideo.propTypes = {
  url: PropTypes.string.isRequired
};

export default FPVideo;
