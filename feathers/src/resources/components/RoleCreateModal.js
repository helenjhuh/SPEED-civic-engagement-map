import React from 'react';
import RoleForm from '../components/forms/role.form';
import Modal from 'react-bootstrap/Modal';

const RoleCreateModal = props => {
  const { show, onHide, onSubmit, role } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-lead">Create a new role</p>
        <RoleForm handleSubmit={onSubmit} role={role} />
      </Modal.Body>
    </Modal>
  );
};

export default RoleCreateModal;
