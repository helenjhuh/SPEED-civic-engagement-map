import React from "react";
import Card from "react-bootstrap/Card";
import SignupForm from "./forms/Signup";

const SignupCard = props => {
  const { handleSubmit } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>Signup</Card.Title>
        <SignupForm handleSubmit={handleSubmit} />
      </Card.Body>
    </Card>
  );
};

export default SignupCard;
