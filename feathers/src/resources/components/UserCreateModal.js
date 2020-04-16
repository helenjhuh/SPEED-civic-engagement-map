import React from 'react';
import UserForm from '../components/forms/user.form';
import Modal from 'react-bootstrap/Modal';

const UserCreateModal = props => {
    const { show, onHide, onSubmit, user } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-lead">Create a new user</p>
                <UserForm handleSubmit={onSubmit} user={user} />
            </Modal.Body>
        </Modal>
    );
};

export default UserCreateModal;
