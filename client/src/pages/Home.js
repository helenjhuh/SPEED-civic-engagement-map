import React, { Component } from "react";

// import React from "react";
import { FPVideo, FeaturedProject } from "../components";
import { actions } from "../store/actions";
import { connect } from "react-redux";

import faker from "faker";

const mapStateToProps = state => ({
  projects: state.project.browsing,
  isLoading: state.project.isLoading,
  error: state.project.error
});

// TODO: Browse projects should eventually accept a payload, that will tell the server
// to limit the amount of projects returned, as well the offset to start at in the databse
const mapDispatchToProps = dispatch => ({
  browse: () => dispatch(actions.project.browse())
});

// const Home = props => {
//   return (

class Home extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.browse();
  }

  render() {
    return (
      <>
        <FPVideo url="https://www.youtube.com/embed/_4B6e8mFqUI?controls=0" />
        <h2
          className="display-3 text-center"
          style={{
            borderBottom: "1px dashed black",
            maxWidth: "700px",
            margin: "0 auto",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            marginBottom: "1em"
          }}
        >
          Featured Projects
        </h2>

        {/* If there is an error loading the projects, display it to the user */}
        {this.props.error && <p className="text-danger">{this.props.error}</p>}

        {/* If the projects are loaded, display them to the user in a list */}
        {this.props.projects &&
          this.props.projects.map((project, i) => (
            <FeaturedProject
              title={project.name}
              description={project.description}
              imageURL={`https://loremflickr.com/640/480?random=${Math.round(
                Math.random() * 10
              )}`}
              projectURL={`/projects/${project._id}`}
              flip={i % 2 != 0}
            />
          ))}
      </>
    );
  }
}
// };

// export default Home;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
