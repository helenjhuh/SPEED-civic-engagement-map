import React from "react";
import Modal from "react-bootstrap/Modal";
import RoleForm from "./forms/role.form";

const RoleEditModal = props => {
  const {
    title = "Edit Resource",
    description = "Be careful, changes are permanent",
    role,
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
        <RoleForm handleSubmit={onSubmit} role={role} />
      </Modal.Body>
    </Modal>
  );
};

export default RoleEditModal;
