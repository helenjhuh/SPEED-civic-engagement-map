import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

class ManageRoles extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      roles: "",
      addRoleModal: false,
      roleName: "",
      roleDescription: "",
      added: "", // this is a placeholder for if a user adds a new role
      editRoleModal: false,
      editingRoleId: ""
    };
    this.openAddRoleModal = this.openAddRoleModal.bind(this);
    this.closeAddRoleModal = this.closeAddRoleModal.bind(this);
    this.onAddRoleFormChange = this.onAddRoleFormChange.bind(this);
    this.saveRole = this.saveRole.bind(this);
    this.editRole = this.editRole.bind(this);
    this.openAddRoleModal = this.openAddRoleModal.bind(this);
    this.closeAddRoleModal = this.closeAddRoleModal.bind(this);
    this.closeEditRoleModal = this.closeEditRoleModal.bind(this);
    this.onEditRoleFormChange = this.onEditRoleFormChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }

  componentDidMount() {
    // When the component mounts, get the roles and set them in the state
    this.getRoles();
  }

  // This sets the state of the edit role modal and can probably be renamed to something more intuitive
  editRole(role) {
    const { _id, name, description } = role;
    // First, display the modal
    this.setState({
      editRoleModal: true,
      roleName: name,
      roleDescription: description,
      editingRoleId: _id
    });
  }

  getRoles() {
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

  openEditRoleModal() {
    this.setState({ editRoleModal: true });
  }

  closeEditRoleModal() {
    this.setState({ editRoleModal: false });
  }

  onAddRoleFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onEditRoleFormChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  deleteRole(id) {
    fetch(`/api/roles/${id}/delete`, { method: "DELETE" })
      .catch(error => this.setState({ error }))
      .finally(() => this.getRoles());
  }

  updateRole(id) {
    const payload = {
      name: this.state.roleName,
      description: this.state.roleDescription
    };

    fetch(`/api/roles/${id}/edit`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ editRoleModal: false });
        this.getRoles();
      });
  }

  saveRole() {
    // construct the payload
    const payload = {
      name: this.state.roleName,
      description: this.state.roleDescription
    };

    // make the request
    fetch(`/api/roles/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.status === "success") {
          this.setState({ added: res.data.role });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ addRoleModal: false });
        this.getRoles();
      });
  }
  render() {
    const { error, isLoading, roles, added } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="display-4 mb-4">Manage Roles</h1>
        <Button onClick={this.openAddRoleModal}>Add a role</Button>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}

        {/* If there aren't any roles, display a message letting the user know */}
        {roles && !roles.length && (
          <p className="lead">
            It doesn't look like there are any roles in your system yet
          </p>
        )}

        {/* If the user has a role that they have added, display a message */}
        {added && (
          <p className="primary">
            You're role has been added! Refresh the page to view it.
          </p>
        )}

        {/* If the roles are loaded, display them */}
        {roles && roles.length > 0 && (
          <Table striped className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, i) => (
                <tr key={`role-${i}`}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => this.editRole(role)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => this.deleteRole(role._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* If the edit role modal is active, show it */}
        <Modal show={this.state.editRoleModal} onHide={this.closeEditRoleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Role</Modal.Title>
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
                  name="roleDescription"
                  value={this.state.roleDescription}
                  onChange={this.onAddRoleFormChange}
                />
              </Form.Group>
              <Button
                className="mt-3"
                onClick={() => this.updateRole(this.state.editingRoleId)}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

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
                  name="roleDescription"
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
