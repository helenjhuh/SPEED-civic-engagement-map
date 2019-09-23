import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapView = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXdlZWQxIiwiYSI6ImNrMGZxa2ZldTAyNHMzb3M4YTZyM3QxNzMifQ.qZtFXEGeC-VE3IwTKHIk_g"
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class Map extends Component {
  state = {
    map: {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  };

  onViewportChange() {}

  render() {
    return (
      <div className="row">
        {/* The map filter section */}
        <div className="col-sm-4">
          <h2>Civic Engagement Projects</h2>
          <input name="searchInput" type="text" />
        </div>

        {/* The map */}
        <div
          className="col-sm-8"
          style={{
            minHeight: "800px",
            minWidth: "400px"
          }}
        >
          <MapView
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature coordinates={[-0.48174, 51.3233]} />
            </Layer>
          </MapView>
        </div>
      </div>
    );
  }
}

export default Map;
