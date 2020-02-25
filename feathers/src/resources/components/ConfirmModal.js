import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmModal = props => {
  const {
    title = "Confirm your action",
    message,
    buttonText = "Confirm",
    action,
    show,
    onHide
  } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-leader">{message}</p>
        <Button variant="warning" onClick={action}>
          {buttonText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
