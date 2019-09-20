import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const AddressForm = ({ street1, street2, city, region, country, onChange }) => {
  return (
    <Form>
      <div className="row">
        <div className="col-sm"></div>
      </div>
    </Form>
  );
};

AddressForm.propTypes = {
  street1: PropTypes.string,
  street2: PropTypes.string,
  city: PropTypes.string,
  region: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func
};

export default AddressForm;
