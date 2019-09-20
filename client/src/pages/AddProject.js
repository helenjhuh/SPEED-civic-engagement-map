import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { actions } from "../store/actions";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs,
  addedProject: state.project.added,
  isLoading: state.project.isLoading,
  error: state.project.error
});

const mapDispatchToProps = dispatch => ({
  add: payload => dispatch(actions.project.add(payload))
});

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      type: "",
      website: "",
      owner: "",
      street1: "",
      street2: "",
      city: "",
      region: "",
      zip: "",
      country: "",
      lat: "",
      lng: "",
      error: ""
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.addProject = this.addProject.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  componentDidMount() {
    this.setState({ owner: this.props.loggedInAs._id });
  }

  geocode() {
    // construct the geocode payload from the address form
    const { street1, city, region, country } = this.state;
    const payload = `${street1} ${city} ${region} ${country}`;

    if (payload.length > 2) {
      fetch(`/api/mapbox/geocode/${payload}`)
        .then(res => res.json())
        .then(res => {
          const { features } = this.state.results;

          this.setState({
            lat: features[0].center[0],
            lng: features[0].center[1]
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  onFormChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addProject(e) {
    e.preventDefault();
    // construct the payload
    const {
      name,
      description,
      type,
      website,
      street1,
      street2,
      city,
      region,
      zip,
      country
    } = this.state;
    const payload = {
      name,
      description,
      type,
      website,
      street1,
      street2,
      city,
      region,
      zip,
      country,
      owner: this.props.loggedInAs._id
    };
    // dispatch action to add project
    this.props.add(payload);
  }

  render() {
    return (
      <div>
        {/* if there's an error, display it to the user */}
        {this.props.error && <p className="error">{this.props.error}</p>}

        {/* if the user project has been added, display it to the user for now */}
        {this.props.addedProject && (
          <p>Your project: {JSON.stringify(this.props.addedProject)}</p>
        )}

        <Form>
          <Form.Group controlId="formProjectName">
            <Form.Label>Project name</Form.Label>
            <Form.Control
              type="text"
              placeholder="My awesome project"
              name="name"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formProjectDescription">
            <Form.Label>Project description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tell us about your project"
              name="description"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formProjectType">
            <Form.Label>Project type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Project type? Should this be a dropdown?"
              name="type"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formProjectWebsite">
            <Form.Label>Project website</Form.Label>
            <Form.Control
              type="text"
              placeholder="If your project has a website please include the URL here"
              name="website"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressStreet1">
            <Form.Label>Street 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 Main St"
              name="street1"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressStreet2">
            <Form.Label>Street 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unit 900"
              name="street2"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="New York City"
              name="city"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressRegion">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="text"
              placeholder="New York"
              name="region"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              placeholder="10021"
              name="zip"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddressCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="United States"
              name="country"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.addProject}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject);
