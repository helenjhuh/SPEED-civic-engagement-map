import React from "react";
import PropTypes from "prop-types";
import { SWAT_RED_RGB } from "../defs";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const FeaturedProject = ({
  title,
  description,
  imageURL,
  flip = false,
  projectURL
}) => {
  // These are in side of the function itself because we need
  // access to the imageURL to generate the styles

  const rootStyles = {
    width: "100%",
    minHeight: "480px"
  };
  const titleHalf = {
    color: "white",
    backgroundColor: SWAT_RED_RGB,
    backgroundImage: `url(${imageURL})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 1em"
  };
  const descriptionHalf = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  const titleStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "1em"
  };
  return (
    <>
      <div className="row" style={rootStyles}>
        <div className="col-sm" style={flip ? descriptionHalf : titleHalf}>
          {flip ? (
            <p className="lead">
              {description}
              <br />
              <br />
              <LinkContainer to={projectURL}>
                <Button>See more</Button>
              </LinkContainer>
            </p>
          ) : (
            <h2 className="display-5" style={titleStyles}>
              {title}
            </h2>
          )}
        </div>
        <div className="col-sm" style={flip ? titleHalf : descriptionHalf}>
          {flip ? (
            <h2 className="display-5" style={titleStyles}>
              {title}
            </h2>
          ) : (
            <p className="lead">
              {description}
              <br />
              <br />
              <LinkContainer to={projectURL}>
                <Button>See more</Button>
              </LinkContainer>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

FeaturedProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  flip: PropTypes.bool,
  projectURL: PropTypes.string.isRequired
};

export default FeaturedProject;
