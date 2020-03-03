import React from "react";
import Modal from "react-bootstrap/Modal";
import ProjectForm from "../../components/forms/Project";
import Form from "react-bootstrap/Form";

const EditModal = props => {
  const { onSubmit, onHide, project, show } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Project Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectForm initialValues={project} handleSubmit={onSubmit}>
          <Form.Group controlId="verify">
            <Form.Check
              name="isVerified"
              type="checkbox"
              label="Verify Project"
            />
          </Form.Group>

          <Form.Group controlId="feature">
            <Form.Check
              name="isFeatured"
              type="checkbox"
              label="Feature Project"
            />
          </Form.Group>
        </ProjectForm>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
