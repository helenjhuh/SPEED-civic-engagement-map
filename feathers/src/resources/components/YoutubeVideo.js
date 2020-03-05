import React from 'react';
import PropTypes from 'prop-types';

const YoutubeVideoStyles = {
  display: 'block',
  width: '100%',
  height: '90vh',
  margin: '16px auto'
};

const YoutubeVideo = props => {
  const { url } = props;

  return (
    <iframe
      title="Home page video"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={YoutubeVideoStyles}
    ></iframe>
  );
};

YoutubeVideo.propTypes = {
  url: PropTypes.string.isRequired
};

export default YoutubeVideo;