import React, { Component } from "react";

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
      .then(res => {
        this.setState({
          projects: res.data.projects
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { error, isLoading, projects } = this.state;

    return (
      <div className="container">
        <h1 className="display-4 mb-4">Manage Projects</h1>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the content is loading, diplay it to the user  */}
        {isLoading && <p className="text-muted">{isLoading}</p>}
        {/* If the projects are loaded, display them */}
        {projects && <p>{JSON.stringify(projects)}</p>}
      </div>
    );
  }
}

export default ManageProjects;
