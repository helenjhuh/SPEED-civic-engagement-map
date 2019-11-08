import React, { Component } from "react";

// import React from "react";
import { FPVideo, FeaturedProject } from "../components";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: "",
      projects: "",
      counter: 0
    };

    this.getProjects = this.getProjects.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    this.setState({ isLoading: true });

    fetch("/api/projects")
      .then(res => res.json())
      .then(res => {
        if (res.status === "error") {
          console.log(res.message);
        } else if (res.status === "fail") {
          console.log(res.data.messsage);
        } else {
          this.setState({ projects: res.data.projects });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { projects, error } = this.state;
    let { counter } = this.state;
    // var FeaturedProjects = { p: []};
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
        {error && <p className="text-danger">{error}</p>}

        {/* If the projects are loaded, display them to the user in a list */}

        {/* {projects &&
          projects.map(
            (project, i) =>
              project.isFeatured && (
                FeaturedProjects.p[i] = project 
              )
          )
        } */}

        {projects &&
          projects.map(
            (project, i) =>
              project.isFeatured &&
              (counter++,
              (
                <FeaturedProject
                  title={project.name}
                  description={project.description}
                  imageURL={`https://loremflickr.com/640/480?random=${Math.round(
                    Math.random() * 10
                  )}`}
                  projectURL={`/projects/${project._id}`}
                  // flip={i % 2 != 0}
                  flip={counter % 2 !== 0}
                />
              ))
          )}
      </>
    );
  }
}

export default Home;
