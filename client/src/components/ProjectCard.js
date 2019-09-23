import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const ProjectCard = ({ project, editOnClick, delOnClick, addPinOnClick }) => {
  const { name, description, type, website, pins } = project;

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
    pins: PropTypes.array
  }).isRequired,
  editOnClick: PropTypes.func,
  delOnClick: PropTypes.func,
  addPinOnClick: PropTypes.func
};

export default ProjectCard;
