import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProjectCard = props => {

    const {project, handleAddPinBtnClick, ...rest} = props;

    return (
        <div className="ProjectCard" {...rest}>
            <Card>
                <Card.Header>
                    <Card.Title>
                        {project.name}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>
                        {project.verified && <Badge variant="primary" className="mr-1">Verified</Badge>} 
                        {project.featured && <Badge variant="primary">Featured</Badge>} 
                    </div>
                    <div>{project.description}</div>
                    <Button onClick={project => handleAddPinBtnClick(project)}>Add Pin</Button>
                </Card.Body>
                <Card.Footer>
                    <p className="text-muted">This project has {project.pins.length} pins!</p>
                </Card.Footer>
            </Card>
        </div>
    );

};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        verified: PropTypes.bool,
        featured: PropTypes.bool,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string),
        issues: PropTypes.arrayOf(PropTypes.string),
        langGrants: PropTypes.arrayOf(PropTypes.string),
        communityPartners: PropTypes.arrayOf(PropTypes.string),
        funders: PropTypes.arrayOf(PropTypes.string),
        beneficiaries: PropTypes.number,
        website: PropTypes.string,
        owner: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        pins: PropTypes.arrayOf(PropTypes.string),
        photos: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default ProjectCard;