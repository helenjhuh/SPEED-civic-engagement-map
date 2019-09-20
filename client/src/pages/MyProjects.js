import React, { Component } from "react";
import { ProjectCard } from "../components";
import { connect } from "react-redux";
import { actions } from "../store/actions";

const mapStateToProps = state => ({
  loggedInAs: state.auth.loggedInAs,
  userProjects: state.project.byUser,
  isLoading: state.project.isLoading,
  error: state.project.error
});

const mapDispatchToProps = dispatch => ({
  getUserProjects: payload => dispatch(actions.project.byUser(payload))
});

class MyProjects extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: false
    };

    this.projectEditClick = this.projectEditClick.bind(this);
    this.projectDeleteClick = this.projectDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.getUserProjects({ id: this.props.loggedInAs._id });
  }

  projectEditClick(id) {
    console.log("Clicked edit button for ", id);
  }
  projectDeleteClick(id) {
    console.log("Clicked delete button for ", id);
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
        {this.props.userProjects &&
          this.props.userProjects.length > 0 &&
          this.props.userProjects.map((p, i) => (
            <ProjectCard
              key={i}
              id={p._id}
              name={p.name}
              description={p.description}
              type={p.type}
              website={p.website}
              editOnClick={() => this.projectEditClick(p._id)}
              delOnClick={() => this.projectDeleteClick(p._id)}
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
