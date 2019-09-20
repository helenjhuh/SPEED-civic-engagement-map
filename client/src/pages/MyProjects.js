import React, { Component } from "react";
import { ProjectCard } from "../components";
import { connect } from "react-redux";
import { actions } from "../store/actions";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs
});

const mapDispatchToProps = dispatch => ({
  read: payload => dispatch(actions.project.read(payload))
});

class MyProjects extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      projects: "",
      isLoading: false
    };

    this.projectEditClick = this.projectEditClick.bind(this);
    this.projectDeleteClick = this.projectDeleteClick.bind(this);
  }
  componentDidMount() {
    // First, set the loading state to true
    this.setState({ isLoading: true });

    const promises = [];

    // When the component starts, get all of the logged in user's projects
    this.props.loggedInAs.projects.map(pid =>
      promises.push(fetch(`/api/projects/${pid}`))
    );

    Promise.all(promises)
      .then(projects => this.setState({ projects: projects.data }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  projectEditClick() {
    console.log("Clicked edit button");
  }
  projectDeleteClick() {
    console.log("Clicked delete button");
  }

  render() {
    return (
      <>
        {/* If there is an error, display it to the user */}
        {this.state.error && <p className="text-danger">{this.state.error}</p>}

        {this.state.isLoading && (
          <p className="text-muted">Loading your projects...</p>
        )}

        {/* If there are projects, display them to the user */}
        {this.state.projects &&
          this.state.projects.length > 0 &&
          this.state.projects.map((p, i) => (
            <ProjectCard
              key={i}
              id={p._id}
              name={p.name}
              description={p.description}
              type={p.type}
              website={p.website}
              editOnClick={this.projectEditClick}
              delOnClick={this.projectDeleteClick}
            />
          ))}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjects);
