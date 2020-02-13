import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
import {
  projectTypes,
  projectIssues,
  projectGrants
} from "../../selectOptions";

const successMsg =
  "The supposed greatest nation on Earth that's all about democracy and freedom has a two-party system, run by lobbyist money, and when their candidates are decided, your vote isn't direct, but you choose these electoral college electors.";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  website: yup.string(),
  street1: yup.string(),
  street2: yup.string(),
  city: yup.string(),
  region: yup.string(),
  zip: yup.string(),
  country: yup.string()
});

const AddProjectForm = props => {
  const { onSubmit } = props;
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
      const payload = `${street1} ${street2} ${city} ${region} $country}`;
      const url = "/api/mapbox/geocode/";
      const opts = { headers: { "Content-Type": "application/json" } };
      const res = await fetch(url, opts);
      const json = await res.json();
      const { results } = json.data;
      const { features } = results;
      setLat(features[0].center[0]);
      setLng(features[0].center[1]);
    } catch (error) {
      setAlert(error);
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  const submit = async values => {
    try {
      setLoading(true);
      const payload = ({
        owner: this.props.loggedInAs._id,
        ...values
      } = payload);
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      };
      const url = "/api/projects/add-with-address";
      const res = await fetch(url, opts);
      const json = await res.json();
      setAlert(successMsg);
      setAlertType("success");
    } catch (error) {
      setAlert(error);
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* If there is an alert, display it */}
      {alert && (
        <Alert variant={alertType} dismissible onClose={clearAlerts}>
          {alert}
        </Alert>
      )}

      <Formik initialValues={{}} onSubmit={submit} validationSchema={schema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h2>Project Information</h2>

            <Form.Group controlId="formik01">
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                placeholder="My awesome project"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik02">
              <Form.Label>Project description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                type="text"
                placeholder="Tell us about your project"
                name="description"
                onChange={handleChange}
                isInvalid={!touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formik03">
              <Form.Label>Project type (Select all that apply)</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="type"
                value={values.type}
                onChange={handleChange}
                multiple
                isInvalid={!touched.type && !!errors.type}
              >
                {projectTypes.map(({ value }) => (
                  <option key={value}>{value}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formikValidate04">
              <Form.Label>Project Issue (Select all that apply)</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="issue"
                onChange={handleChange}
                multiple
                isInvalid={!touched.issue && !!errors.issue}
              >
                {projectIssues.map(({ value }) => (
                  <option key={value}>{value}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.issue}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formik05">
              <Form.Label>
                Lang Center Grants and Awards (Select all that apply)
              </Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="langGrants"
                onChange={handleChange}
                multiple
                isInvalid={!touched.langGrants && !!errors.langGrants}
              >
                {projectGrants.map(({ value }) => (
                  <option key={value}>{value}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.langGrants}
              </Form.Control.Feedback>
            </Form.Group>

            {/* create a bunch of options here */}
            <Form.Group controlId="formik06">
              <Form.Label>Funders (create as many as needed)</Form.Label>
              <Form.Control
                type="text"
                name="funders"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.funders}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formik07">
              <Form.Label>Beneficiaries (please enter appx. number)</Form.Label>
              <Form.Control
                type="text"
                name="beneficiaries"
                placeholder="0"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.beneficiaries}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik08">
              <Form.Label>Project website</Form.Label>
              <Form.Control
                type="text"
                placeholder="If your project has a website please include the URL here"
                name="website"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.website}
              </Form.Control.Feedback>
            </Form.Group>

            <h2>Address Information</h2>

            <Form.Group id="formik09">
              <Form.Label>Street 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="123 Main Street"
                name="street1"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik10">
              <Form.Label>Street 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unit 1"
                name="street2"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street2}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik11">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Philadelphia"
                name="city"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik12">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="PA"
                name="region"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.region}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik13">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="19000"
                name="zip"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="formik14">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="United States"
                name="country"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={!isValid || !isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProjectForm;
