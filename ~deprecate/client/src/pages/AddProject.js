import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import projectSchema from "../validators/project";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import ProjectForm from "../components/forms/Project";

const successMsg = "Default success message";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

const AddProjectPage = props => {
  const { loggedInAs } = props;

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const clearAlerts = () => {
    setAlert(null);
    setAlertType(null);
  };

  const geocodeAddress = async address => {
    try {
      setLoading(true);
      const { street1, street2, city, region, country } = address;
      const payload = encodeURI(
        `${street1} ${street2} ${city} ${region} $country}`
      );
      const url = `/api/mapbox/geocode/${payload}`;
      const opts = { headers: { "Content-Type": "application/json" } };
      const res = await fetch(url, opts);
      const json = await res.json();
      const { results } = json.data;
      const { features } = results;
      setLat(features[0].center[0]);
      setLng(features[0].center[1]);
    } catch (error) {
      console.error(error);
      setAlert(error);
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    try {
      setLoading(true);
      // attempt to geocode the address first
      const {
        street1 = "",
        street2 = "",
        city = "",
        region = "",
        zip = "",
        country = ""
      } = values;
      const address = {
        street1,
        street2,
        city,
        region,
        zip,
        country
      };
      await geocodeAddress(address);

      console.log({ values, lat, lng, props });

      const payload = {
        owner: loggedInAs._id,
        ...values,
        lat,
        lng
      };

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      };
      const url = "/api/projects/add-with-address";
      const res = await fetch(url, opts);

      await res.json();

      setAlert(successMsg);
      setAlertType("success");
    } catch (error) {
      console.error(error);
      setAlert(error);
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: "",
    description: "",
    type: [],
    issues: [],
    langGrants: [],
    communityPartners: [],
    funders: [],
    beneficiaries: "",
    website: "",
    street1: "",
    street2: "",
    city: "",
    region: "",
    zip: "",
    country: "",
    pins: [],
    photos: []
  };

  return (
    <Container>
      {alert && (
        <Alert variant={alertType} dismissible onClose={clearAlerts}>
          {alert}
        </Alert>
      )}
      <h2>Project Information</h2>
      <ProjectForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={projectSchema}
      />
    </Container>
  );
};

export default connect(mapStateToProps)(AddProjectPage);
