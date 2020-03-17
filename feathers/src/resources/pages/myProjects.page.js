import React, {useEffect, useState} from 'react'
import feathers, { services } from '../feathers';
import ProjectCard from '../components/ProjectCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const MyProjectsPage = props => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

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
  }

  useEffect(() => {
    getUserProjects()
  },[]);

  return (
    <div className="MyProjects">
      <Container>
        <h1 className="mb-4">My Projects</h1>
        {error && <p>{error}</p>}
        {loading && <p>Getting your projects...</p>}
        <Row>
          {projects.map((project, i) => <Col xs={12} xm={12} md={6} lg={6} xl={4}><ProjectCard className="mb-3" key={i} project={project} /></Col>)}
        </Row> 
      </Container>
    </div>
  );
}

export default MyProjectsPage;