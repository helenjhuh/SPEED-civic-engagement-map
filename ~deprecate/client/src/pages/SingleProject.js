import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    // const samplePicURL = `https://loremflickr.com/640/480?random=${Math.round(
    //   Math.random() * 10)}`;
    return (
      <div className="container">
        <div
          className="display-2 mb-3"
          style={{
            backgroundImage: "url(https://loremflickr.com/640/480?random=75)",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3em",
            paddingTop: "5em",
            color: "white",
            marginBottom: "1.75rem"
          }}
        >
          <h1
            className="display-2 mb-3"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "1em"
            }}
          >
            {project.name || "Project title"}
          </h1>
        </div>
        {/* If there's an error, display it to the user */}
        {error && <p className="text-danger">{error}</p>}
        {/* If the project is loading, display it to the user */}
        {isLoading && <p className="text-muted">Loading...</p>}
        {/* Finally, if the project is loaded, display it to the user */}
        {project && (
          <div>
            <Row>
              <Col>
                <h2
                  className="display-4"
                  style={{ color: "#A3292A", marginBottom: "1.75rem" }}
                >
                  [ {project.type} ]
                </h2>
                <p
                  className="font-weight-normal"
                  style={{
                    fontSize: "18px",
                    fontFamily: "'Open Sans', sans-serif",
                    lineHeight: "1.75em",
                    marginBottom: "1.75rem"
                  }}
                >
                  {project.description}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "'Open Sans', sans-serif",
                    lineHeight: "1.75em",
                    marginBottom: "1.75rem"
                  }}
                >
                  <strong>Issue Areas: </strong>
                  {project.issue &&
                    project.issue.map((issue, i) => <span>{issue}, </span>)}
                </p>
                <h2
                  className="display-4"
                  style={{ color: "#A3292A", marginBottom: "1.75rem" }}
                >
                  Community
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "'Open Sans', sans-serif",
                    lineHeight: "1.75em",
                    marginBottom: "1.75rem"
                  }}
                >
                  {project.communityPartners &&
                    project.communityPartners.map((c, i) => (
                      <li
                        style={{
                          listStylePosition: "inside",
                          listStyleType: "none",
                          textIndent: "1.75rem"
                        }}
                      >
                        <h3> - {c}</h3>
                      </li>
                    ))}
                </p>
                {project.langGrants && (
                  <h2
                    className="display-4"
                    style={{ color: "#A3292A", marginBottom: "1.75rem" }}
                  >
                    Lang Center Grants
                  </h2>
                )}
                {project.langGrants &&
                  project.langGrants.map(lg => (
                    <li
                      style={{
                        fontSize: "18px",
                        fontFamily: "'Open Sans', sans-serif",
                        lineHeight: "1.75em",
                        listStylePosition: "inside",
                        listStyleType: "none",
                        textIndent: "1.75rem"
                      }}
                    >
                      <h3> - {lg}</h3>
                    </li>
                  ))}
              </Col>
              <Col sm={4}>
                {/* Eventually check for user phrofile picutre upload */}
                <Image
                  src="https://loremflickr.com/640/480?random=85"
                  thumbnail
                  style={{
                    maxBlockSize: "10em",
                    border: "none"
                  }}
                />
                <p className="lead">Managed by {project.owner.email}</p>
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
                    <strong>Website: </strong>
                    <a
                      className="link link-primary"
                      href={project.website}
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        backgroundColor: "transparent"
                      }}
                    >
                      {project.website}
                    </a>
                  </p>
                )}
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
export default SingleProject;
