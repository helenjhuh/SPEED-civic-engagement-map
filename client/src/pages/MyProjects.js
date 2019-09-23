import React, { Component } from "react";
import { ProjectCard } from "../components";
import { connect } from "react-redux";
import { actions } from "../store/actions";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs,
  userProjects: state.project.byUser,
  isLoading: state.project.isLoading,
  error: state.project.error
});

const mapDispatchToProps = dispatch => ({
  getUserProjects: payload => dispatch(actions.project.byUser(payload))
});

class MyProjects extends Component {
  constructor() {
    super();
    this.state = {
      addPinModal: false,
      location: "", // this is the location search box in the add pin modal
      geocodeResults: "",
      projectid: "" // this is used when adding a pin
    };
    this.projectEditClick = this.projectEditClick.bind(this);
    this.projectDeleteClick = this.projectDeleteClick.bind(this);
    this.addPinOnClick = this.addPinOnClick.bind(this);
    this.onAddPinFormChange = this.onAddPinFormChange.bind(this);
    this.openAddPinModal = this.openAddPinModal.bind(this);
    this.closeAddPinModal = this.closeAddPinModal.bind(this);
    this.submitPin = this.submitPin.bind(this);
    this.geocode = this.geocode.bind(this);
  }
  componentDidMount() {
    this.props.getUserProjects({ id: this.props.loggedInAs._id });
  }
  openAddPinModal() {
    this.setState({ addPinModal: true });
  }
  closeAddPinModal() {
    this.setState({ addPinModal: false });
  }
  submitPin() {
    // construct the payload
    const endpoint = `/api/pins/add-with-address-to-project?id=${this.state.projectid}`;
    const payload = {
      lat: `${this.state.geocodeResults[0].center[0]}`,
      lng: `${this.state.geocodeResults[0].center[1]}`
    };
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }
  onAddPinFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

    if (this.state.location.length > 3) {
      this.geocode();
    }
  }
  geocode() {
    // construct the payload
    const payload = this.state.location;
    fetch(`/api/mapbox/geocode/${payload}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ geocodeResults: res.data.results.features });
      })
      .catch(error => this.setState({ error }));
  }
  projectEditClick(id) {
    console.log("Clicked edit button for ", id);
  }
  projectDeleteClick(id) {
    // delete the project
    // TODO: This should probably have some sort of delete confirmation before
    // the action occurs
    fetch(`/api/projects/${id}/delete`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        // TODO: This isn't refreshing the page on a success response for some reason
        if (res.status === "success") {
          this.setState(this.state);
        } else if (res.status === "failure") {
          this.setState({ error: res.data.message });
        } else if (res.status === "error") {
          this.setState({ error: res.error });
        }
      });
  }
  addPinOnClick(id) {
    this.setState({ projectid: id });
    this.openAddPinModal();
  }
  render() {
    return (
      <>
        {/* If there is an error, display it to the user */}
        {this.props.error && <p className="text-danger">{this.state.error}</p>}

        {this.props.isLoading && (
          <p className="text-muted">Loading your projects...</p>
        )}

        {/* If the add pin modal is active, show it */}
        <Modal show={this.state.addPinModal} onHide={this.closeAddPinModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a pin to Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {this.state.geocodeResults && (
                <p className="text-muted">
                  Using location: {this.state.geocodeResults[0].place_name}
                </p>
              )}
              {this.state.geocodeResults && (
                <p className="text-muted">
                  Coordinates: {this.state.geocodeResults[0].center[0]},
                  {this.state.geocodeResults[0].center[1]}
                </p>
              )}
              <Form.Group controlId="formPinLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Begin typing to search"
                  name="location"
                  onChange={this.onAddPinFormChange}
                />
                <Button className="mt-3" onClick={this.submitPin}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        {/* If there aren't any projects, display the add a project link to the user */}
        {this.props.userProjects && this.props.userProjects.length == 0 && (
          <div>
            <p>It doesn't look like you have any projects yet!</p>
            <LinkContainer to="/projects/add">
              <Button variant="primary" size="lg">
                Add a project
              </Button>
            </LinkContainer>
          </div>
        )}
        {/* If there are projects, display them to the user */}
        {this.props.userProjects &&
          this.props.userProjects.length > 0 &&
          this.props.userProjects.map((p, i) => (
            <ProjectCard
              key={i}
              id={p._id}
              name={p.name}
              description={p.description}
              type={p.type}
              website={p.website}
              pins={p.pins}
              editOnClick={() => this.projectEditClick(p._id)}
              delOnClick={() => this.projectDeleteClick(p._id)}
              addPinOnClick={() => this.addPinOnClick(p._id)}
            />
          ))}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjects);
