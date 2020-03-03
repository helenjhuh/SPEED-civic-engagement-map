import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";

class ProjectCard extends Component {
  state = {
    error: "",
    isLoading: false
  };

  handleDelete = (projectId, photoHash) => {
    this.setState({ isLoading: true });
    fetch(`/api/projects/${projectId}/${photoHash}/delete`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        // when we get the response refresh the page
        document.location.reload();
      })
      .catch(err => this.setState({ error: err }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const {
      project,
      editOnClick,
      delOnClick,
      addPinOnClick,
      addPhotoOnClick
    } = this.props;
    const { _id, name, description, type, website, pins, photos } = project;

    return (
      <div className="card">
        <div className="card-body">
          <h2>{name}</h2>
          {type && type.map(t => <span className="text-muted">{t} ; </span>)}
          <p>{description}</p>
          {website && (
            <p>
              <a href={website}>{website}</a>
            </p>
          )}

          {pins &&
            pins.map((p, i) => {
              return (
                <div>
                  <p key={i}>{JSON.stringify(p)}</p>
                </div>
              );
            })}

          <div>
            {editOnClick && (
              <Button className="mr-2" onClick={editOnClick}>
                Edit
              </Button>
            )}
            {delOnClick && (
              <Button className="mr-2" onClick={delOnClick}>
                Delete
              </Button>
            )}
            {addPinOnClick && (
              <Button className="mr-2" onClick={addPinOnClick}>
                Add pin
              </Button>
            )}
            {addPhotoOnClick && (
              <Button className="mr-2" onClick={addPhotoOnClick}>
                Add Photo
              </Button>
            )}

            {/* Create a grid of photos for the project*/}
            {photos && (
              <Container>
                <Row>
                  {photos.map(photo => (
                    <Col key={photo} xs={12} md={6}>
                      <div
                        className="my-3"
                        style={{
                          position: "relative",
                          width: 400,
                          height: 300,
                          backgroundImage: `url(/api/files/${photo})`,
                          backgroundSize: "cover"
                        }}
                      >
                        <Button
                          onClick={() => this.handleDelete(_id, photo)}
                          className="btn-danger btn-sm"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0
                          }}
                        >
                          Delete
                        </Button>
                        <p>
                          <a
                            href={`http://localhost:8000/api/files/${photo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: "rgba(0, 0, 0)",
                              color: "white",
                              position: "absolute",
                              bottom: 0,
                              width: "100%",
                              textAlign: "center"
                            }}
                          >
                            View full-size
                          </a>
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}

            <LinkContainer
              to={`/projects/${_id}`}
              style={{
                marginTop: "1rem"
              }}
            >
              <Button className="mr-2">Go to project</Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
    website: PropTypes.string,
    pins: PropTypes.array,
    photos: PropTypes.array
  }).isRequired,
  editOnClick: PropTypes.func,
  delOnClick: PropTypes.func,
  addPinOnClick: PropTypes.func,
  addPhotoOnClick: PropTypes.func
};

export default ProjectCard;
