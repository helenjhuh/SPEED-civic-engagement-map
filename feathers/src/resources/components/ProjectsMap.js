import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGL, { Layer, Feature, MapContext } from 'react-mapbox-gl;
import mapboxgl from 'mapbox-gl';
import CommonData from '../data/CommonAreas.json';

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

  const {projects} = props;

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoomLevel);
  const [fitBounds, setFitBounds] = useState(undefined);

  const handleFeatureClick = (data) => {
    console.log(data);
  }

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
      >
        <MapContext.Consumer>
          {map => {
            const marker = require("../images/map-marker-2-32.png");
            map.loadImage(marker, (error, image) => {
              if (error) throw error;
              map.addImage("custom-marker", image);
            });
          }}
        </MapContext.Consumer>

        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "custom-markert" }} 
        >
          {projects.map(project => <Feature 
            key={project._id} 
            coordinates={[project.address.lat, project.address.lng]} 
            onClick={handleFeatureClick} 
            />)}
        </Layer>
          
        <MapContext.Consumer>
            {map => {
              CommonData.features.map(feature => map.addLayer({
                id: feature.properties.name,
                type: 'fill',
                source: {
                  type: 'geojson',
                  data: feature
                },
                layout: {},
                paint: {
                  'fill-color': '#888',
                  'fill-opacity': 0.15
                }
              }))
              .addLayer({
                id: `${feature.properties.name}Fill`,
                type: 'line',
                source: {
                  type: 'geojson',
                  data: feature
                },
                layout: {},
                paint: {
                  'line-color': 'rgba(0,0,0,1)',
                  'line-width': 2
                }
              })
            }}
        </MapContext.Consumer>

      </MapView>
    </div>
  );

};

export default ProjectsMap;