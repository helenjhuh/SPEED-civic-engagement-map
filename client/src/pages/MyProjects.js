import React, { Component } from "react";
import { ProjectCard } from "../components";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { PhotoUpload } from "../components";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

class MyProjects extends Component {
  constructor() {
    super();
    this.state = {
      addPinModal: false,
      location: "", // this is the location search box in the add pin modal
      geocodeResults: "",
      projectid: "", // this is used when adding a pin
      editProjectModal: false,
      viewing: "", // this holds the project that the user is viewing -- such as within the edit modal
      editForm: {
        _id: "",
        name: "",
        description: "",
        type: "",
        website: ""
      },
      projects: "",
      isLoading: "",
      error: "",
      addPhotoModal: false
    };

    // This can probably be seriously cleaned up
    this.projectEditClick = this.projectEditClick.bind(this);
    this.projectDeleteClick = this.projectDeleteClick.bind(this);
    this.addPinOnClick = this.addPinOnClick.bind(this);
    this.onAddPinFormChange = this.onAddPinFormChange.bind(this);
    this.openAddPinModal = this.openAddPinModal.bind(this);
    this.closeAddPinModal = this.closeAddPinModal.bind(this);
    this.submitPin = this.submitPin.bind(this);
    this.geocode = this.geocode.bind(this);
    this.closeEditProjectModal = this.closeEditProjectModal.bind(this);
    this.saveProjectEdits = this.saveProjectEdits.bind(this);
    this.onEditFormChange = this.onEditFormChange.bind(this);
    this.getProjectsByUser = this.getProjectsByUser.bind(this);
    this.closeAddPhotoModal = this.closeAddPhotoModal.bind(this);
    this.addPhotoOnClick = this.addPhotoOnClick.bind(this);
  }

  componentDidMount() {
    this.getProjectsByUser();
  }

  getProjectsByUser() {
    this.setState({ isLoading: true });
    fetch(`/api/projects/by-user/${this.props.loggedInAs._id}`)
      .then(res => res.json())
      .then(results => this.setState({ projects: results.data.projects }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  openAddPinModal() {
    this.setState({ addPinModal: true });
  }

  closeAddPinModal() {
    this.setState({ addPinModal: false });
  }

  submitPin() {
    // construct the payload
    const payload = {
      lat: `${this.state.geocodeResults[0].center[0]}`,
      lng: `${this.state.geocodeResults[0].center[1]}`
    };
    fetch(`/api/pins/add-with-address-to-project?id=${this.state.projectid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).finally(() => {
      // close the modal
      this.closeAddPinModal();
      // get the projects again, which will force a re-render. The newly created pin
      // should be attached to the new data
      this.getProjectsByUser();
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
  projectEditClick(project) {
    // First set the edit form state
    this.setState({
      editForm: {
        _id: project._id,
        name: project.name,
        description: project.description,
        type: project.type,
        website: project.website
      }
    });

    // Then open the edit modal
    this.openEditProjectModal();
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
      })
      .finally(() => {
        // fetch the projects again
        this.getProjectsByUser();
      });
  }
  addPinOnClick(id) {
    this.setState({ projectid: id });
    this.openAddPinModal();
  }
  openEditProjectModal() {
    this.setState({ editProjectModal: true });
  }
  closeEditProjectModal() {
    this.setState({ editProjectModal: false });
  }
  saveProjectEdits() {
    // make fetch (or redux) request to save edits
    // for now just output the state to make sure the correct request
    // is sent
    console.log(this.state.editForm);
  }
  onEditFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      editForm: {
        [name]: value
      }
    });
  }
  closeAddPhotoModal() {
    this.setState({
      addPhotoModal: false,
      projectId: ""
    });
  }
  addPhotoOnClick(project) {
    this.setState({
      addPhotoModal: true,
      projectId: project._id
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 mb-4">My Projects</h1>

        {/* If there is an error, display it to the user */}
        {this.state.error && <p className="text-danger">{this.state.error}</p>}

        {this.state.isLoading && (
          <p className="text-muted">Loading your projects...</p>
        )}

        {/* If the add photo modal is active, show it */}
        {this.state.projectId && (
          <Modal
            show={this.state.addPhotoModal}
            onHide={this.closeAddPhotoModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add a photo to your project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PhotoUpload projectId={this.state.projectId} />
            </Modal.Body>
          </Modal>
        )}

        {/* If the edit project modal is active, shot it */}
        <Modal
          show={this.state.editProjectModal}
          onHide={this.closeEditProjectModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editing project details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.editForm.name}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.editForm.description}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={this.state.editForm.type}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={this.state.editForm.website}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>
              <Button className="mt-3" onClick={this.saveProjectEdits}>
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

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
        {this.state.projects && this.state.projects.length === 0 && (
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
        {this.state.projects &&
          this.state.projects.length > 0 &&
          this.state.projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              editOnClick={() => this.projectEditClick(p)}
              delOnClick={() => this.projectDeleteClick(p._id)}
              addPinOnClick={() => this.addPinOnClick(p._id)}
              addPhotoOnClick={() => this.addPhotoOnClick(p)}
            />
          ))}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  null
)(MyProjects);
