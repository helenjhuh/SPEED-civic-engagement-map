import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const ProjectCard = ({
  project,
  editOnClick,
  delOnClick,
  addPinOnClick,
  addPhotoOnClick
}) => {
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

          {photos && <div>photos go here</div>}
          <LinkContainer to={`/projects/${_id}`}>
            <Button className="mr-2">Go to project</Button>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
};

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
