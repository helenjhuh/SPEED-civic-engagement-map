import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const FeaturedProjectCard = props => {

    const { project } = props;

    const cardStyles = {
        maxWidth: 400,
        minHeight: '100%'
    };

    return (
        <Card style={cardStyles}>
            <Card.Img variant="top" src={`https://via.placeholder.com/400x300.png?text=${project.name}`} />
            <Card.Body>
                <Card.Title className="mb-2">
                    <h5>{project.name}</h5>
                </Card.Title>
                <Card.Subtitle className="mb-2 subtitle">
                    Created {new Date(project.createdAt).toDateString()}
                </Card.Subtitle>
                <Card.Text className="lead">
                    {project.description}
                </Card.Text>
                <Card.Link href="#" as={Button} variant="primary">Show on map</Card.Link>
                {project.website && (<><br /><Card.Link href={project.website} as={Button} variant="secondary" className="mt-2">{project.website}</Card.Link></>)}
            </Card.Body>
        </Card>
    );

};

FeaturedProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};

export default FeaturedProjectCard;