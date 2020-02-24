import React from "react";
import Card from "react-bootstrap/Card";
import SignupForm from "./forms/signup.form";

const SignupCard = props => {
  const { handleSubmit } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>Signup</Card.Title>
        <SignupForm handleSubmit={handleSubmit} />
      </Card.Body>
    </Card>
  );
};

export default SignupCard;
