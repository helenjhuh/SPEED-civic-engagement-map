import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class ManageRoles extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      roles: "",
      addRoleModal: false,
      roleName: "",
      roleDescription: ""
    };

    this.openAddRoleModal = this.openAddRoleModal.bind(this);
    this.closeAddRoleModal = this.closeAddRoleModal.bind(this);
    this.onAddRoleFormChange = this.onAddRoleFormChange.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }

  componentDidMount() {
    // When the component mounts, get the roles and set them in the state
    this.setState({ isLoading: true });

    fetch(`/api/roles`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          roles: res.data.roles
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }
  openAddRoleModal() {
    this.setState({ addRoleModal: true });
  }
  closeAddRoleModal() {
    this.setState({ addRoleModal: false });
  }
  onAddRoleFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  saveRole() {
    console.log("Saving role...");
  }
  render() {
    const { error, isLoading, roles } = this.state;

    return (
      <div className="container">
        <h1 className="display-4 mb-4">Manage Roles</h1>
        <Button onClick={this.openAddRoleModal}>Add a role</Button>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}
        {/* If the roles are loaded, display them */}
        {roles && <p>{JSON.stringify(roles)}</p>}
        {/* If the add role modal is active, show it */}
        <Modal show={this.state.addRoleModal} onHide={this.closeAddRoleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="roleName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="roleName"
                  value={this.state.roleName}
                  onChange={this.onAddRoleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="roleDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.roleDescription}
                  onChange={this.onAddRoleFormChange}
                />
              </Form.Group>
              <Button className="mt-3" onClick={this.saveRole}>
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ManageRoles;
