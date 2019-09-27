import React, { Component } from "react";

class ManageUsers extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      users: ""
    };
  }

  componentDidMount() {
    // When the component mounts, get the users and set them in the state

    this.setState({ isLoading: true });

    fetch(`/api/users`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: res.data.users
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { error, isLoading, users } = this.state;

    return (
      <div className="container">
        <h1 className="display-4 mb-4">Manage Users</h1>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}
        {/* If the users are loaded, display them */}
        {users && <p>{JSON.stringify(users)}</p>}
      </div>
    );
  }
}

export default ManageUsers;
