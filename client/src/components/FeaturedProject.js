import React from "react";
import PropTypes from "prop-types";
import { SWAT_RED_RGB } from "../defs";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const MAX_HEIGHT = 500;

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
    minHeight: "480px",
    maxHeight: { MAX_HEIGHT }
  };
  const titleHalf = {
    color: "white",
    backgroundColor: SWAT_RED_RGB,
    backgroundImage: `url(${imageURL})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 1em",
    maxHeight: "inherit"
  };
  const descriptionHalf = {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    padding: "1em",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    maxHeight: "inherit"
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
            <>
              {/* DESCRIPTION */}
              <div
                className="row"
                style={{
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                <p className="d-inline-block">{description}</p>
              </div>

              <br />
              <br />

              {/* BUTTON */}
              <div
                className="row"
                style={{
                  display: "flex"
                }}
              >
                <LinkContainer to={projectURL}>
                  <Button>See more</Button>
                </LinkContainer>
              </div>
            </>
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
            <>
              {/* DESCRIPTION */}
              <div
                className="row"
                style={{
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                <p className="d-inline-block">{description}</p>
              </div>

              <br />
              <br />

              {/* BUTTON */}
              <div
                className="row"
                style={{
                  display: "flex"
                }}
              >
                <LinkContainer to={projectURL}>
                  <Button>See more</Button>
                </LinkContainer>
              </div>
            </>
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
