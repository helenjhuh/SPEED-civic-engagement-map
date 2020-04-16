import React from 'react';
import Container from 'react-bootstrap/Container';

const SWAT_RED_RGB = 'rgb(162, 42, 42)';

const rootStyles = {
    backgroundColor: SWAT_RED_RGB,
    width: '100%',
    color: 'white',
    minheight: '128px',
    paddingTop: '3em',
    paddingBottom: '3em'
};

const Footer = () => (
    <div style={rootStyles}>
        <Container>
            <p className="text-center">
                {/* Not sure if this text needs to change or not */}
        Designed by Swarthmore College. All Rights Reserved.
            </p>
        </Container>
    </div>
);

export default Footer;
