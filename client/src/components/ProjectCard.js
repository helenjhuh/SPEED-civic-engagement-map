import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const ProjectCard = ({
  id,
  name,
  description,
  type = "",
  website = "",
  editOnClick,
  delOnClick
}) => {
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

        <div>
          {editOnClick && <Button onClick={editOnClick}>Edit</Button>}
          {delOnClick && <Button onClick={delOnClick}>Delete</Button>}
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
  website: PropTypes.string,
  editOnClick: PropTypes.func,
  delOnClick: PropTypes.func
};

export default ProjectCard;
