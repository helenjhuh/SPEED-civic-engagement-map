import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import Alert from "react-bootstrap/Alert";
import { projectTypes, projectIssues, projectGrants } from "../selectOptions";
import schema from "../validators/project";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import CustomSelectMultiple from "../components/CustomSelectMultiple";
import FormControl from "react-bootstrap/FormControl";

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

  const submit = async values => {
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
    funders: "",
    beneficiaries: "",
    website: "",
    street1: "",
    street2: "",
    city: "",
    region: "",
    zip: "",
    ountry: ""
  };

  return (
    <Container>
      {alert && (
        <Alert variant={alertType} dismissible onClose={clearAlerts}>
          {alert}
        </Alert>
      )}

      <h2>Project Information</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={schema}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formik01">
              <Form.Label>Project name</Form.Label>
              <Field name="name" type="name" as={FormControl} />
              <ErrorMessage name="email" />
            </Form.Group>

            <Form.Group id="formik02">
              <Form.Label>Project description</Form.Label>
              <Field name="description" type="text" as={FormControl} />
              <ErrorMessage name="description" />
            </Form.Group>

            <Form.Group controlId="formik03">
              <Form.Label>Project type (Select all that apply)</Form.Label>
              <Field
                component={CustomSelectMultiple}
                options={projectTypes}
                isMulti
                name="type"
              />
              <ErrorMessage name="type" />
            </Form.Group>

            <Form.Group controlId="formik04">
              <Form.Label>Project Issue (Select all that apply)</Form.Label>
              <Field
                component={CustomSelectMultiple}
                options={projectIssues}
                isMulti
                name="issue"
              />
            </Form.Group>

            <Form.Group controlId="formik05">
              <Form.Label>
                Lang Center Grants and Awards (Select all that apply)
              </Form.Label>
              <Field
                component={CustomSelectMultiple}
                options={projectGrants}
                isMulti
                name="langGrants"
              />
            </Form.Group>

            <Form.Group controlId="formik06">
              <Form.Label>Funders (create as many as needed)</Form.Label>
              <Field name="funders" type="number" as={FormControl} />
              <ErrorMessage name="funders" />
            </Form.Group>

            <Form.Group controlId="formik07">
              <Form.Label>Beneficiaries (please enter appx. number)</Form.Label>
              <Field name="beneficiaries" type="number" as={FormControl} />
              <ErrorMessage name="beneficiaries" />
            </Form.Group>

            <Form.Group id="formik08">
              <Form.Label>Project website</Form.Label>
              <Field name="website" type="text" as={FormControl} />
              <ErrorMessage name="website" />
            </Form.Group>

            <h2>Address Information</h2>

            <Form.Group id="formik09">
              <Form.Label>Street 1</Form.Label>
              <Field name="street1" type="text" as={FormControl} />
              <ErrorMessage name="street1" />
            </Form.Group>

            <Form.Group id="formik10">
              <Form.Label>Street 2</Form.Label>
              <Field name="street2" type="text" as={FormControl} />
              <ErrorMessage name="street2" />
            </Form.Group>

            <Form.Group id="formik11">
              <Form.Label>City</Form.Label>
              <Field name="city" type="text" as={FormControl} />
              <ErrorMessage name="city" />
            </Form.Group>

            <Form.Group id="formik12">
              <Form.Label>Region</Form.Label>
              <Field name="region" type="text" as={FormControl} />
              <ErrorMessage name="region" />
            </Form.Group>

            <Form.Group id="formik13">
              <Form.Label>Zip</Form.Label>
              <Field name="zip" type="text" as={FormControl} />
              <ErrorMessage name="zip" />
            </Form.Group>

            <Form.Group id="formik14">
              <Form.Label>Country</Form.Label>
              <Field name="country" type="text" as={FormControl} />
              <ErrorMessage name="country" />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default connect(mapStateToProps)(AddProjectPage);
