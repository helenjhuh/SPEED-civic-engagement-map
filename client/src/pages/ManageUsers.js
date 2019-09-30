import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class ManageUsers extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      users: ""
    };

    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // grab all the users from teh backend on component mount
    fetch("/api/users")
      .then(res => res.json())
      .then(res => this.setState({ users: res.data.users }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onEditBtnClick(user) {
    console.log("Edit button clicked");
    console.log({ user });
  }

  onDeleteBtnClick(user) {
    console.log("Delete button clicked");
    console.log({ user });
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

        {/* If the component has loaded the users, display them in a table */}
        {users && users.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>id</th>
                <th>first</th>
                <th>last</th>
                <th>email</th>
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
                    <Button
                      variant="primary"
                      onClick={user => this.onEditBtnClick(user)}
                    >
                      Edit
                    </Button>
                    <br />
                    <Button
                      variant="danger"
                      onClick={user => this.onDeleteBtnClick(user)}
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
