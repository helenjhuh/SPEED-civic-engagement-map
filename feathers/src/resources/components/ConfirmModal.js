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
        <Modal.Text>{title}</Modal.Text>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        <Button variant="warning" onClick={() => action}>
          {buttonText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
