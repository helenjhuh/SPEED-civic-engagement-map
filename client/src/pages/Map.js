import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapView = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXdlZWQxIiwiYSI6ImNrMGZxa2ZldTAyNHMzb3M4YTZyM3QxNzMifQ.qZtFXEGeC-VE3IwTKHIk_g"
});

const mapStateToProps = state => ({
  projects: state.project.browsing,
  isLoading: state.project.isLoading,
  error: state.project.error
});

const mapDispatchToProps = dispatch => ({});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: {
        viewport: {
          width: 400,
          height: 400,
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 8
        }
      },
      filter: ""
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  onFilterChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

    // When the filter text is changed, it should filter the list of projects containing
    // only text with whatever the text string is. We will need to figure out what fields
    // on the project itself should allow filtering against.
  }

  onViewportChange() {}

  render() {
    return (
      <div className="row">
        {/* The map filter section */}
        <div className="col-sm-4">
          <h2>Civic Engagement Projects</h2>
          <input
            id="feature-filter"
            name="filter"
            value={this.state.filter}
            type="text"
            onChange={this.onFilterChange}
          />

          {/* If the projects are loading, display it to the user */}
          {this.props.isLoading && <p className="text-muted">Loading...</p>}

          {/* If there is an error loading the projects, display it to the user */}
          {this.props.error && (
            <p className="text-danger">{this.props.error}</p>
          )}

          {/* If the projects are loaded, display them to the user in a list */}
          {this.props.projects && (
            <div>
              {this.props.projects.map((project, i) => (
                <div key={i}>{JSON.stringify(project)}</div>
              ))}
            </div>
          )}
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
