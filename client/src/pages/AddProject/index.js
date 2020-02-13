import React from "react";
import Container from "react-bootstrap/Container";
import AddProjectForm from "./form";

const AddProjectPage = props => {
  return (
    <Container>
      <h1>Submit your project</h1>
      <AddProjectForm />
    </Container>
  );
};

export default AddProjectPage;
