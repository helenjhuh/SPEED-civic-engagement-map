import React from "react";
import ProjectForm from "../components/forms/project.form";
import Modal from "react-bootstrap/Modal";

const ProjectCreateModal = props => {
  const { show, onHide, onSubmit, project } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-lead">Create a new Project</p>
        <ProjectForm handleSubmit={onSubmit} project={project} />
      </Modal.Body>
    </Modal>
  );
};

export default ProjectCreateModal;
