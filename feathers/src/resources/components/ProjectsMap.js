import React, { useState } from 'react';
import ReactMapboxGL, { Layer, Feature, MapContext } from 'react-mapbox-gl;
import mapboxgl from 'mapbox-gl';

const MapView = ReactMapboxGL({
  accessToken: '',
  minZoom: 8,
  maxZoom: 20
});

const defaultCenter = [-75.3499, 39.9021];
const onClickZoomLevel = [18];
const defaultZoomLevel = [11];

const mapStyles = {
  minHeight: '80vh',
  minWidth: '40vw'
}

const ProjectsMap = props => {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoomLevel);
  const [fitBounds, setFitBounds] = useState(undefined);

  return (
    <div style={mapStyles}>
      <MapView 
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={center}
        zoom={zoom}
        fitBounds={fitBounds}
        flyToOptions={{
          speed: 0.8
        }}
      />
    </div>
  );

};

export default ProjectsMap;