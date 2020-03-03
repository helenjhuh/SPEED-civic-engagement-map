import React from 'react';
import Modal from 'react-bootstrap/Modal';
import UserForm from './forms/user.form';

const EditModal = props => {
  const {
    title = 'Edit Resource',
    description = 'Be careful, changes are permanent',
    user,
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
        <UserForm handleSubmit={onSubmit} user={user} />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
