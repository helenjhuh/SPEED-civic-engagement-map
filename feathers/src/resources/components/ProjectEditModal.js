import React from "react";
import Modal from "react-bootstrap/Modal";
import ProjectForm from "../components/forms/project.form";

const ProjectEditModal = props => {
  const {
    title = "Edit Resource",
    description = "Be careful, changes are permanent",
    project,
    onSubmit,
    show,
    onHide
  } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-lead">{description}</p>
        <ProjectForm handleSubmit={onSubmit} project={project} />
      </Modal.Body>
    </Modal>
  );
};

export default ProjectEditModal;
