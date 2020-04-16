import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from '../components/Map';
import MapControls from '../components/MapControls';

import feathers, { services } from '../feathers';

const ProjectsPage = props => {

    const [filter, setFilter]               = useState('');
    const [projects, setProjects]           = useState([]);
    const [cities, setCities]               = useState([])
    const [mapCenter, setMapCenter]         = useState([-75.3499, 39.9021]);
    const [mapZoom, setMapZoom]             = useState([11]);
    const [mapFitBounds, setMapFitBounds]   = useState(undefined);

    /**
     * @desc Transforms an array of strings into an array of objects
     * where in each object contains the string and the number of
     * occurances
     * @param [String] arr
     * @returns [{ city: String, count: Number }]
     **/
    const count = arr => {
        const output = [];
        arr.forEach(city => {
            const count = arr.filter(c => c === city).length;
            // check that the city doesn't exist already
            const exists = output.filter(c => c.city === city).length > 0;
            if (!exists) {
                output.push({ city, count });
            }
        });
        return output;
    }

    const getCities = () => {
        const cities = projects.map(project => project.address.city);
        const cityFilters = count(cities);
        const sorted = cityFilters.sort((a, b) => (a.count < b.count ? 1 : -1));
        setCities(sorted);
    };

    const getProjects = async () => {
        try {
            const res = await services.projects.find({
                query: {
                    $populate: ['owner', 'address']
                }
            });
            setProjects(res.data);
            getCities();
        } catch(error) {
            console.error(error);
        }
    };

    const handleProjectClick = project => {
        try {
            const lat = project.address.lat;
            const lng = project.address.lng;
            setMapCenter([lat, lng]);
        } catch(error) {
            console.log(project);
            console.error(error);
        }
    };

    const handleFilterClick = filter => {
        setFilter(filter.city);
    };

    const handleResetClick = () => {
        setFilter('');
    };

    const handleFilterChange = e => setFilter(e.target.value) 
    const closePopups = () => {};

    /**
     * @desc Returns a random item from an array
     * @param [any] arr
     * @returns any
     **/
    const randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)]

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="ProjectsPage">
            <Container fluid>
                <Row>
                    <Col lg={4}>
                        <MapControls 
                            projects={projects} 
                            cities={cities}
                            onResetClick={handleResetClick}
                            onProjectClick={handleProjectClick}
                            onFilterClick={handleFilterClick}
                            onFilterChange={handleFilterChange}
                            filter={filter}
                        />
                    </Col>
                    <Col>
                        <Map 
                            projects={projects}
                            centerCoords={mapCenter}
                            zoomLevel={mapZoom}
                            fitBounds={mapFitBounds}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );

};

export default ProjectsPage;