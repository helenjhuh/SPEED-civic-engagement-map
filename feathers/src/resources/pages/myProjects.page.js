import React, { useEffect, useState } from 'react';
import feathers, { services } from '../feathers';
import ProjectCard from '../components/ProjectCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AddPinModal from '../components/AddPinModal';

const MyProjectsPage = props => {

    const [geo, setGeo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [showPinModal, setShowPinModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [geoData, setGeoData] = useState(null);

    const sanitize = str => {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str;
    }

    const geocode = async () => {
        try {
            setLoading(true);
            const [res] = await services.mapbox.find({ query: { query: sanitize(geo) }});
            setGeoData(res);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getUserProjects = async () => {
        try {
            setLoading(true);
            const { user } = await feathers.reAuthenticate();
            const { data } = await services.projects.find({ query: { owner: user._id } });
            setProjects(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPinBtnClick = project => {
        setModalData(project);
        setShowPinModal(true);
    }

    const handleClosePinModal = () => {
        setShowPinModal(false);
        setModalData(null);
    }

    const handlePinFormChange = e => {
        setGeo(e.target.value);
        if (geo.length > 3) {
            geocode(geo);
        }
    }

    const handleAddPinSubmit = async () => {
        try {
            const projectId = modalData._id;

            const pp = {
                lat: geoData.center[0],
                lng: geoData.center[1]
            };
            const { _id: pinId } = await services.pins.create(pp)
            const update = await services.projects.patch(projectId, { $push: { pins: pinId }}) 
            // close the modal 
            setShowPinModal(false);
            setModalData(null);
            setGeoData(null);
            getUserProjects();
        } catch (error) {
            setError(error.message);
        }

    }

    useEffect(() => {
        getUserProjects();
    }, []);

    return (
        <div className="MyProjects">
            <Container>
                <h1 className="mb-4">My Projects</h1>
                {error && <p>{error}</p>}
                <Row>
                    {projects.map((project, i) => <Col key={project._id} xs={12} xm={12} md={6} lg={6} xl={4}>
                        <ProjectCard 
                            className="mb-3" 
                            project={project} 
                            handleAddPinBtnClick={() => handleAddPinBtnClick(project)} 
                        />
                    </Col>)}
                    <AddPinModal
                        handleFormSubmit={handleAddPinSubmit}
                        show={showPinModal}
                        onHide={handleClosePinModal}
                        handleGeoOnChange={handlePinFormChange}
                        geo={geo}
                    />
                </Row>
            </Container>
        </div>
    );
};

export default MyProjectsPage;