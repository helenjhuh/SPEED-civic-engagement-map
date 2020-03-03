import React from "react";
import PropTypes from "prop-types";
import { SWAT_RED_RGB } from "../defs";
import { LinkContainer } from "react-router-bootstrap";

const FAQ = ({ question, answer, optionalURL }) => {
  const questionStyle = {
    color: SWAT_RED_RGB
  };
  return (
    <>
      <p>
        <strong style={questionStyle}>Q: {question}</strong> <br />
        A: {answer} <br />
        {optionalURL ? (
          <LinkContainer to={optionalURL}>
            <p className="text-primary">Learn More</p>
          </LinkContainer>
        ) : null}
      </p>
    </>
  );
};

FAQ.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  optionalURL: PropTypes.string
};

export default FAQ;
