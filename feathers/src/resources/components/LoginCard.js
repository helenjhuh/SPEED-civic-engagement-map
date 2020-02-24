import React from "react";
import Card from "react-bootstrap/Card";
import LoginForm from "./forms/Login";

const LoginCard = props => {
  const { handleSubmit } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <LoginForm handleSubmit={handleSubmit} />
      </Card.Body>
    </Card>
  );
};

export default LoginCard;
