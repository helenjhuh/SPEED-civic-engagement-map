import React from 'react';
import AddPinForm from './AddPinForm';
import Modal from 'react-bootstrap/Modal';

const AddPinModal = props => {

    const { show, onHide, geo, handleGeoOnChange, handleFormSubmit } = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                Add Pin
            </Modal.Header>
            <Modal.Body>
                <p className="text-leader">
                    Add a pinned location to your project
                </p>
                <AddPinForm 
                    handleFormSubmit={handleFormSubmit} 
                    handleOnChange={handleGeoOnChange} 
                    value={geo}
                />
            </Modal.Body>
        </Modal>
    )
}

export default AddPinModal;