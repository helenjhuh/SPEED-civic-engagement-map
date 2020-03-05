import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const FeaturedProjectCard = props => {

  const { project } = props;
  
  const cardStyles = {
    maxWidth: 400
  };

  return (
    <Card style={cardStyles}>
      <Card.Img variant="top" src={`https://via.placeholder.com/400x300.png?text=${project.name}`} />
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle>Created {new Date(project.createdAt).toDateString()}</Card.Subtitle>
        <Card.Text>
          {project.description}
        </Card.Text>
        {project.website && <Card.Link href={project.website}>{project.website}</Card.Link>}
        <Card.Link href="#">Show on map</Card.Link>
      </Card.Body>
    </Card>
  );

};

FeaturedProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default FeaturedProjectCard;