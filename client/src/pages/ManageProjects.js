import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class ManageProjects extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      projects: "",
      editModal: false,
      name: "",
      description: "",
      type: "",
      website: ""
    };

    this.getProjects = this.getProjects.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
    this.onEditFormChange = this.onEditFormChange.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    // When the component mounts, get the users and set them in the state
    this.setState({ isLoading: true });

    fetch(`/api/projects`)
      .then(res => res.json())
      .then(res => this.setState({ projects: res.data.projects }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  closeEditModal() {
    this.setState({ editModal: false });
  }

  openEditModal(project) {
    this.setState({
      editModal: true,
      projectId: project._id,
      name: project.name,
      description: project.description,
      type: project.type,
      website: project.website,
      isVerified: project.isVerified,
      isFeatured: project.isFeatured
    });
  }

  // Send the request to update the project, then fetch the new projects list
  updateProject() {
    console.log(this.state);
    fetch(`/api/projects/${this.state.projectId}/edit`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        type: this.state.type,
        website: this.state.website,
        isVerified: this.state.isVerified,
        isFeatured: this.state.isFeatured
      })
    })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.closeEditModal();
        this.getProjects();
      });
  }

  // Send the request to delete the project, then fetch the new projects list
  deleteProject(project) {}

  onEditBtnClick(project) {
    this.openEditModal(project);
  }

  onDeleteBtnClick(project) {}

  // Set the state based on the edit form
  onEditFormChange(e) {
    const { name, value, checked } = e.target;
    const toggleCheck = name === "isVerified" || name === "isFeatured";

    // If toggling check-box
    toggleCheck && this.setState({ [name]: checked });

    //If editing value
    !toggleCheck && this.setState({ [name]: value });
  }
  render() {
    const { error, isLoading, projects } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="display-4 mb-4">Manage Projects</h1>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}
        {/* If the projects are loaded, display them */}
        {projects && projects.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>Verified</th>
                <th>Featured</th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>URL</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project, i) => (
                <tr key={`project-${i}`}>
                  <td>{project.isVerified ? "x" : " "}</td>
                  <td>{project.isFeatured ? "x" : " "}</td>
                  <td>{project.name}</td>
                  <td>
                    <div
                      style={{
                        height: "9em",
                        overflow: "auto"
                      }}
                    >
                      {project.description}
                    </div>
                  </td>
                  <td>{project.type}</td>
                  <td>{project.website}</td>
                  <td>
                    {project.address.city || ""} {project.address.region || ""}
                  </td>
                  <td>{project.owner.email}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => this.onEditBtnClick(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => this.onDeleteBtnClick(project)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Only show this if the project edit modal is open */}
        <Modal show={this.state.editModal} onHide={this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editing project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Form.Group controlId="type">
                <Form.Control
                  type="text"
                  name="type"
                  value={this.state.type}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Form.Group controlId="website">
                <Form.Control
                  type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Form.Group controlId="verify">
                <Form.Check
                  name="isVerified"
                  type="checkbox"
                  label="Verify Project"
                  defaultChecked={this.state.isVerified}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Form.Group controlId="feature">
                <Form.Check
                  name="isFeatured"
                  type="checkbox"
                  label="Feature Project"
                  defaultChecked={this.state.isFeatured}
                  onChange={this.onEditFormChange}
                />
              </Form.Group>

              <Button className="mt-3" onClick={() => this.updateProject()}>
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* If there aren't any projects, display a message letting the user know */}
        {projects && !projects.length && (
          <p className="lead">
            It doesn't look like there are any projects in your system yet
          </p>
        )}
      </div>
    );
  }
}

export default ManageProjects;
