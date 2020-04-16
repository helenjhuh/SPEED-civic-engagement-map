import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

const popupStyles = {
  backgroundColor: "white",
  borderRadius: "8px 8px 8px 8px",
  width: "25em"
};

const accessToken = 'pk.eyJ1IjoiYXdlZWQxIiwiYSI6ImNrNXk2eXg3djBwYjUzbW5ldzBvbGJ0bGkifQ.UqSEUBRPi06kCVWyCRhRYw';

const Map = ReactMapboxGl({ accessToken });

const ProjectsMap = props => {

    const { projects = [], centerCoords = [-75.3499, 39.9021], zoomLevel = [11], fitBounds = undefined } = props;

    return (
        <Map
            style={"mapbox://styles/mapbox/streets-v9"}
            containerStyle={{
                height: '100%',
                width: '100%'
            }} 
            onStyleLoad={map => map.resize()}
            center={centerCoords}
            zoom={zoomLevel}
            fitBounds={undefined}
        >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.4817478,  51.32333]} />
            </Layer>
        </Map>
    );
};

ProjectsMap.propTypes = {
    projects: PropTypes.array.isRequired,
    centerCoords: PropTypes.array,
    zoomLevel: PropTypes.array
};

export default ProjectsMap;