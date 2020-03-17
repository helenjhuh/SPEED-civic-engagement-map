import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YoutubeVideo from '../components/YoutubeVideo';
import FeaturedProjectCard from '../components/FeaturedProjectCard';

const HomePage = props => {
  const { featuredProjects = [] } = props;

  const featuredHeaderStyles = {
    borderBottom: '1px dashed black',
    maxWidth: '700px',
    margin: '0 auto',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    marginBottom: '1em'
  };

  return (
    <div>      <YoutubeVideo url={'https://www.youtube.com/embed/_4B6e8mFqUI?controls=0'} />
      {featuredProjects.length > 0 && <Container>
        <h2
          className="display-3 text-center"
          style={featuredHeaderStyles}
        >
          Featured Projects
        </h2>
        <Row>
          {featuredProjects.map(project => 
              <Col key={project._id} xs={12} md={6} lg={4} xl={4} className="mb-3">
                  <FeaturedProjectCard 
                    key={project._id} 
                    project={project} />
              </Col>
          )} 
        </Row>
      </Container>}
 </div>
 );
};

HomePage.propTypes = {
  featuredProjects: PropTypes.array
};

export default HomePage;
