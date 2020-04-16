import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddPinToProjectForm = props => {

    const { handleFormSubmit, handleOnChange, value } = props;

    return (
        <Form>
            <Form.Group controlId="geolocate">
                <Form.Control 
                    type="text" 
                    placeholder="Try Swarthmore, PA" 
                    onChange={handleOnChange}  
                    value={value} 
                /> 
            </Form.Group>
            <Button onClick={handleFormSubmit}>Add pin</Button>
        </Form>
    )
}

AddPinToProjectForm.propTypes = {
    value: PropTypes.string.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired
};

export default AddPinToProjectForm;
