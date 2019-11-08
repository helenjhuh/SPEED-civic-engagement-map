import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
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
        console.log(res);
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
          {type && <p className="text-muted">{type}</p>}
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
                      <a
                        href={`http://localhost:8000/api/files/${photo}`}
                        target="_blank"
                      >
                        <Image
                          className="my-3 mx-2"
                          src={`/api/files/${photo}`}
                          rounded
                          width={400}
                          height={300}
                        />
                      </a>
                      {/* Each image also needs a delete button */}
                      <Button onClick={() => this.handleDelete(_id, photo)}>
                        Delete
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}

            <LinkContainer to={`/projects/${_id}`}>
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
