import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

class ManageUsers extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      users: "",
      roles: "",
      rolesModal: false,
      editingUser: ""
    };

    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
    this.getRoles = this.getRoles.bind(this);
    this.addRoleToUser = this.addRoleToUser.bind(this);
    this.onAddRoleBtnClick = this.onAddRoleBtnClick.bind(this);
    this.closeRoleModal = this.closeRoleModal.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    this.setState({ isLoading: true });
    // grab all the users from teh backend on component mount
    fetch("/api/users")
      .then(res => res.json())
      .then(res => this.setState({ users: res.data.users }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onEditBtnClick = user => {
    console.log("Edit button clicked");
    console.log({ user });
  };

  onDeleteBtnClick(user) {
    console.log("Delete button clicked");
    console.log({ user });
  }

  addRoleToUser(user, role) {
    this.setState({ isLoading: true });
    fetch(`/api/users/${user._id}/add-role/${role._id}`, { method: "POST" })
      .then(res => res.json())
      .then(results => {
        this.closeRoleModal();
        this.getUsers();
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getRoles() {
    this.setState({ isLoading: true });
    fetch("/api/roles")
      .then(res => res.json())
      .then(results => this.setState({ roles: results.data.roles }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onAddRoleBtnClick(user) {
    this.setState({
      rolesModal: true,
      editingUser: user
    });
    this.getRoles();
  }

  closeRoleModal() {
    this.setState({ rolesModal: false });
  }

  render() {
    const { isLoading, users, error } = this.state;

    return (
      <div className="container">
        <h1 className="display-4 mb-4">Manage Users</h1>
        {/* If he we have error, display it */}
        {error && <p className="text-danger">{error}</p>}

        {/* If the component is  laoding data, display it */}
        {isLoading && <p className="text-muted">Loading content...</p>}

        {/* The modal we use to display the roles in a list */}
        <Modal show={this.state.rolesModal} onHide={this.closeRoleModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add role to {this.state.editingUser.email}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.roles &&
                this.state.roles.map((role, i) => (
                  <ListGroup.Item key={i}>
                    <p className="lead">{role.name}</p>
                    <p>{role.description}</p>
                    <Button
                      variant="primary"
                      block
                      onClick={() =>
                        this.addRoleToUser(this.state.editingUser, role)
                      }
                    >
                      Assign role
                    </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Modal.Body>
        </Modal>

        {/* If the component has loaded the users, display them in a table */}
        {users && users.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>id</th>
                <th>first</th>
                <th>last</th>
                <th>email</th>
                <th>roles</th>
                <th>actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user._id}</td>
                  <td>{user.first}</td>
                  <td>{user.last}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles.length === 0 && <p>No roles</p>}
                    {user.roles.length > 0 &&
                      user.roles.map((role, j) => <p key={j}>{role.name}</p>)}
                  </td>
                  <td>
                    <Button
                      onClick={() => this.onAddRoleBtnClick(user)}
                      size="sm"
                      variant="text"
                    >
                      Add role
                    </Button>
                    <Button
                      onClick={() => this.onEditBtnClick(user)}
                      size="sm"
                      variant="text"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => this.onDeleteBtnClick(user)}
                      size="sm"
                      variant="text"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* If there aren't any users in the system , display a message */}
        {users && !users.length && (
          <p className="lead">
            It doesn't look like there are any users in the system yet.
          </p>
        )}
      </div>
    );
  }
}

export default ManageUsers;
