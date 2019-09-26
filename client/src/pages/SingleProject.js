import React, { Component } from "react";

class SingleProject extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: "",
      project: ""
    };
  }
  componentDidMount() {
    // The query string should have the project id, so when the component mounts
    // Grab the project id, and get the project
    // Once it has loaded, set the state to alert the user

    this.setState({ isLoading: true });

    const { id } = this.props.match.params;
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          project: res.data.project
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { project, isLoading, error } = this.state;
    return (
      <div className="container">
        <h1 className="display-4 mb-4">{project.name || "Project title"}</h1>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the project is loading, display it to the user */}
        {isLoading && <p className="text-muted">Loading...</p>}
        {/* Finally, if the project is loaded, display it to the user */}
        {project && (
          <div>
            <p className="lead">Managed by {project.owner.email}</p>
            <p className="text-primary">
              <strong>[{project.type}]</strong> {project.description}
            </p>
            <p>
              <strong>Location:</strong>
            </p>
            {project.address.street1 && (
              <p className="text-muted">{project.address.street1}</p>
            )}
            {project.address.street2 && (
              <p className="text-muted">{project.address.street2}</p>
            )}
            {project.address.city && (
              <p className="text-muted">{project.address.city}</p>
            )}
            {project.address.region && (
              <p className="text-muted">{project.address.region}</p>
            )}
            {project.address.zip && (
              <p className="text-muted">{project.address.zip}</p>
            )}
            {project.address.country && (
              <p className="text-muted">{project.address.country}</p>
            )}

            {project.website && (
              <p>
                <strong>Website:</strong> {project.website}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default SingleProject;
