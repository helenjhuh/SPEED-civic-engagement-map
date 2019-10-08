import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class ManageProjects extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      projects: ""
    };
  }

  componentDidMount() {
    // When the component mounts, get the users and set them in the state

    this.setState({ isLoading: true });

    fetch(`/api/projects`)
      .then(res => res.json())
      .then(res => this.setState({ projects: res.data.projects }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
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
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.type}</td>
                  <td>{project.website}</td>
                  <td>
                    {project.address.city || ""} {project.address.region || ""}
                  </td>
                  <td>{project.owner.email}</td>
                  <td>
                    <Button size="sm" variant="text">
                      Edit
                    </Button>
                    <Button size="sm" variant="text">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* If there aren't any roles, display a message letting the user know */}
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
