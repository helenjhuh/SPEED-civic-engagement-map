import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Badge from 'react-bootstrap/Badge';

const ProjectFilterList = props => {
    const { projects, onProjectClick } = props;

    return (
        <ListGroup as="ul">
            {projects.map((p, i) => (
                <ListGroupItem key={i} as="li" action onClick={() => onProjectClick(p)} style={{ cursor: "pointer" }}>
                    <p className="lead">{p.name}</p>
                    {p.types.map((pt, t) => <Badge key={t} className="mb-2 mr-1" variant={t === 0 ? 'primary' : 'secondary'}>{pt}</Badge>)}
                    <p className="text-muted">{p.description}</p>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

ProjectFilterList.propTypes = {
    projects: PropTypes.array.isRequired,
    onProjectClick: PropTypes.func.isRequired
};

export default ProjectFilterList;