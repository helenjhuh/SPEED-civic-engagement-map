import React from "react";
import Card from "react-bootstrap/Card";
import LoginForm from "./forms/login.form";

const LoginCard = props => {
  const { handleSubmit } = props;
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <LoginForm handleSubmit={handleSubmit} />
      </Card.Body>
    </Card>
  );
};

export default LoginCard;
