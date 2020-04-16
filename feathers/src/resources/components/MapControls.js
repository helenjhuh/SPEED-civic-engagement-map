import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import ProjectFilterList from './ProjectFilterList';
import Badge from 'react-bootstrap/Badge';

const MapControls = props => {

    const {
        projects = [],
        cities = [],
        onFilterClick,
        onResetClick,
        onFilterChange,
        onProjectClick,
        filter
    } = props;
    
    return (
        <div className="MapControls">

            <div className="my-3">
                {cities.map((filter, i) => (
                    <Button
                        variant="outline-dark"
                        key={filter + i}
                        className="m-1"
                        size="sm"
                        onClick={() => onFilterClick(filter)}
                    >
                        {filter.city} <Badge variant="light">{filter.count}</Badge>
                    </Button>
                ))}
                <Button
                    variant="warning"
                    className="m-1"
                    size="sm"
                    onClick={() => onResetClick()}
                >
                    Reset
                </Button>
            </div>

            <Form.Group>
                <Form.Control
                    id="feature-filter"
                    type="text"
                    placeholder="Search to filter"
                    name="filter"
                    onChange={onFilterChange}
                    value={filter}
                />
            </Form.Group>

            <ProjectFilterList projects={projects} onProjectClick={onProjectClick} />

        </div>
    );
};

MapControls.propTypes = {
    projects: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onResetClick: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onProjectClick: PropTypes.func.isRequired,
    filter: PropTypes.string
};

export default MapControls;